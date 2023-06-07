import pandas as pd
import numpy as np
from numerize import numerize
import plotly.express as px
from json import dumps
from plotly.utils import PlotlyJSONEncoder
from upload import df1 as df
# import warnings

# warnings.filterwarnings('ignore')

# numerize.numerize(123445.8)

# sckit learn
# from sklearn.impute import SimpleImputer
# matplotlib lib and seaborn imports
# import matplotlib.pyplot as plt
# %matplotlib inline
# import seaborn as sns

# from plotly.subplots import make_subplots

Starting_Year=2014
End_Year=2022

# df = pd.read_excel('Store_data_v2.xlsx')
# df = pd.read_excel('/home/yoglabs/mysite/Files/Store_data_v2.xlsx')
# print(df)
df['year'] = df['Date'].dt.year
df['month'] = df['Date'].dt.month
# print(df)

# def year_factor(df,initial,final):
#     dataframe = df[(df['year'] >= initial ) & (df['year'] <= final )]
#     return dataframe
# if(initial & final):
#     df=year_factor(df,initial,final)
# print(df)



data = df.drop(['Barcode', 'size', 'Size', 'Style', 'SM', 'Serial No'], axis=1)


# Year Change

# date

nan_date = data[data['Date'].isna()]

# qty
mode_val = data['Qty'].mode()[0]
data['Qty'].replace(np.nan, mode_val, inplace=True)

# Amount
nan_Amount = data[data['Amount'].isna()]


# Amount is given by the product of rate and qty , so missing values can be filled accordingly
def amount(x):
    if np.isnan(x['Amount']):
        return x['Qty'] * x['Rate']
    else:
        return x['Amount']


data['Amount'] = data.apply(lambda x: amount(x), axis=1)

# handling discount column : if absent replace with 0
data['Dis Per'].replace(np.nan, 0, inplace=True)


def effRate(x):
    if np.isnan(x['EffRate']):
        return x['Rate']
    else:
        return x['EffRate']


data['EffRate'] = data.apply(lambda x: effRate(x), axis=1)


# EffAmount is given by the product of effRate and qty , so missing values can be filled accordingly
def amount(x):
    if np.isnan(x['EffAmt']):
        return x['Qty'] * x['EffRate']
    else:
        return x['Amount']


data['EffAmt'] = data.apply(lambda x: amount(x), axis=1)

cost_null = data[data['EffCost'].isna()]

data['EffCost'].replace(np.nan, 0, inplace=True)
data['Margin'].replace(np.nan, 0, inplace=True)
data['Margin % on Cost'].replace(np.nan, 0, inplace=True)
data['PerOn MRP'].replace(np.nan, 0, inplace=True)
data['TaxRate'].replace(np.nan, 0, inplace=True)

#
data['Product Category'] = data['Product Category'].astype(str)
data['Department'] = data['Department'].astype(str)
data['Brand'] = data['Brand'].astype(str)
data['product'] = data['product'].astype(str)
data['Color'] = data['Color'].astype(str)
data['Item'] = data['Item'].astype(str)
data['Vch No'] = data['Vch No'].astype(str)
data['year'] = data['year'].astype(str)
# data['month'] = data['month'].astype(str)

# fig = px.imshow(data.corr(),text_auto=True)
# fig.show()

# sperating pos quantity data
# brought items
pos_data = data[data['Qty'] > -1]
# returned items
neg_data = data[data['Qty'] < 0]

years = data['year'].unique()
months = data['month'].unique()
products = data['product'].unique()
brands = data['Brand'].unique()

# groups
year_group = pos_data.groupby('year')
month_group = pos_data.groupby('month')
year_group_sum = year_group.sum(numeric_only=True)
year_group_sum['Sale'] = year_group_sum['Amount']
month_group_sum = month_group.sum(numeric_only=True)


def summary_all_years():
    fign = px.bar(year_group_sum, x=years, y=['Margin', 'Sale', 'EffCost'], barmode='group',
                  title='Year wise summary of sale,margin and cost', labels={"EffCost": "Sale"})
    graphJSON = dumps(fign, cls=PlotlyJSONEncoder)

    return graphJSON


months = data['month'].unique()
months.sort()

# [year, month, total margins, costs, sales]
# 1) create dataframe for year and month with margin, cost and sales:
monthwise_sub_data = {'year': [], 'month': [], 'margin': [], 'cost': [], 'sale': []}
for year in years:
    # group by year
    df_year = year_group.get_group(year)
    month_f = df_year['month'].unique()
    month_grp = df_year.groupby('month')

    for month in month_f:
        df_month = month_grp.get_group(month)
        df_month = df_month.select_dtypes(include=['float', 'int'])
        sum = df_month.sum()
        sales = sum['Amount']
        cost = sum['EffCost']
        # total margin
        margin = sum['Margin']
        # append values to lists
        monthwise_sub_data['year'].append(year)
        monthwise_sub_data['month'].append(month)
        monthwise_sub_data['sale'].append(sales)
        monthwise_sub_data['cost'].append(cost)
        monthwise_sub_data['margin'].append(margin)
# create dataframe from dictionary
monthwise_sub_data = pd.DataFrame(monthwise_sub_data)
# print(monthwise_sub_data)

def summary_month_margin():
    # new_monthwise_sub_data = monthwise_sub_data[(monthwise_sub_data['year'] >= (initial) ) & (monthwise_sub_data['year'] <= (final) )]

    fign = px.bar(monthwise_sub_data, x='month', y='margin', color='year',
                  barmode='group', title='Month wise summary of margin for different years')
    # fign.show()
    graphJSON = dumps(fign, cls=PlotlyJSONEncoder)
    return graphJSON

def summary_month_sales():
    fign = px.bar(monthwise_sub_data, x='month', y='sale', color='year',
                  barmode='group', title='Month wise summary of Sales for different years')
    graphJSON = dumps(fign, cls=PlotlyJSONEncoder)
    # fign.show()
    return graphJSON


def monthwise_summary(from_year, to_year):
    monthwise_sub_data['year'] = monthwise_sub_data['year'].astype(int)
    df = monthwise_sub_data[(monthwise_sub_data['year'] >= from_year) & (monthwise_sub_data['year'] <= to_year)]
    fig = px.bar(df, x='month', y=['margin', 'cost', 'sale'], facet_row="year", facet_row_spacing=0.01, height=800,
                 width=800, barmode='group',
                 title=f'Summary of sale,margin and cost for every year ( {from_year} to {to_year} ) ')
    graphJSON = dumps(fig, cls=PlotlyJSONEncoder)
    # fig.show()
    return graphJSON

def animated_monthwise_summary():
    monthwise_sub_data['year'] = monthwise_sub_data['year'].astype(int)
    # df = monthwise_sub_data[(monthwise_sub_data['year'] >= from_year) & (monthwise_sub_data['year'] <= to_year)]
    fig = px.bar(monthwise_sub_data, x='month', y=['margin', 'cost', 'sale'], animation_frame="year",
                 animation_group="month", barmode='group', range_x=[0, 13], range_y=[1000, 3900000],
                 title=f'Month-wise summary of sale,margin and cost for every year')
    # fig.show()
    graphJSON = dumps(fig, cls=PlotlyJSONEncoder)

    return graphJSON

# animated_monthwise_summary()
# popularity dataframe
# x-axis : margin
# yaxis : popularity
# animation : year

# create dataframe for year and brand distributed based on popularity and margin :
sub_data_1 = {'year': [], 'brand': [], 'popularity': [], 'margin': []}
brands = brands.astype(str)

for year in years:
    # group by year
    df_year = year_group.get_group(year)
    brands_f = df_year['Brand'].unique()
    # sub group by brand
    sub_brand = df_year.groupby('Brand')
    for brand in brands_f:
        sum = sub_brand.get_group(brand).select_dtypes(include=['float', 'int']).sum()
        # popularity: total qty sold for the brand
        popularity = sum['Qty']
        # total margin for the brand
        margin = sum['Margin']
        # append values to lists
        sub_data_1['year'].append(year)
        sub_data_1['brand'].append(brand)
        sub_data_1['popularity'].append(popularity)
        sub_data_1['margin'].append(margin)
# create dataframe from dictionary
sub_data_1 = pd.DataFrame(sub_data_1)

# popularity


def popularity_yearwise(initial=Starting_Year,final=End_Year):
    new_sub_data_1 = sub_data_1[(sub_data_1['year'] >= str(initial) ) & (sub_data_1['year'] <= str(final) )]
    # print(new_sub_data_1)
    fig2 = px.scatter(new_sub_data_1, x="margin", y="popularity", animation_frame="year", animation_group="brand",
                      color="brand", hover_name="brand", size='popularity', text='brand', height=700,
                      log_x=True, size_max=100, title=f"Popularity vs Margin for different brands, yearwise ( from {initial} to {final} )")
    # fig2.show()
    graphJSON = dumps(fig2, cls=PlotlyJSONEncoder)

    return graphJSON

# popularity_yearwise()

def compare_popularity_yearwise(brands,initial=Starting_Year,final=End_Year):
    df = sub_data_1[sub_data_1['brand'].isin(brands)]
    new_df = df[(df['year'] >= str(initial) ) & (df['year'] <= str(final) )]
    # print(new_df)
    fig2 = px.scatter(new_df, x="margin", y="popularity", animation_frame="year", animation_group="brand",
                      color="brand", hover_name="brand", size='popularity', text='brand',
                      log_x=True, size_max=100, title=f"Popularity vs Margin for different brands, yearwise ( from {initial} to {final} )")
    # fig2.show()
    graphJSON = dumps(fig2, cls=PlotlyJSONEncoder)
    return graphJSON

# compare_popularity_yearwise(['JAIPUR MODERN', '11.11', 'OH LA LA'])

def numerizer(x):
    return numerize.numerize(x['margin'])


sub_data_1['margin_format'] = sub_data_1.apply(lambda x: numerizer(x), axis=1)
pos_sub_data = sub_data_1[sub_data_1['margin'] > -1]
# print("Pos sub data",pos_sub_data)

def margin_brands(initial=Starting_Year,final=End_Year):
    new_pos_sub_data = pos_sub_data[(pos_sub_data['year'] >= str(initial) ) & (pos_sub_data['year'] <= str(final) )]
    fig = px.sunburst(new_pos_sub_data, path=['year', 'brand', 'margin_format'], color='brand',
                      title=f"Yearwise Brands with Margin  ( from {initial} to {final} )", values="margin")
    # fig.show()
    graphJSON = dumps(fig, cls=PlotlyJSONEncoder)
    return graphJSON

# margin_brands()
# sunburst

sub_data_1['popularity'] = sub_data_1['popularity'].astype(int)
# print("Sub data 1",sub_data_1)

def popularity_brands(initial=Starting_Year,final=End_Year):
    # print("Sub data",sub_data_1)
    new_sub_data_1 = sub_data_1[(sub_data_1['year'] >= str(initial) ) & (sub_data_1['year'] <= str(final) )]
    # print(sub_data_1[sub_data_1['year'] ==str(2023)])
    fig = px.sunburst(new_sub_data_1, path=['year', 'brand', 'popularity'], color='brand',
                      title=f"Yearwise Brands with Popularity ( from {initial} to {final} )", values='popularity')
    # fig.show()
    graphJSON = dumps(fig, cls=PlotlyJSONEncoder)
    return graphJSON

# popularity_brands()
# TREE MAP

# hierarchical level data set
# Product Category -> Department -> Brand -> Product -> Design -> Color ->Total Margin and Popularity
# create dataframe for year and brand distributed based on popularity and margin :
sub_data = {'year': [], 'PC': [], 'Department': [], 'Brand': [], 'Product': [], 'Design': [], 'Color': [],
            'popularity': [], 'margin': [], 'sales': []}
brands = brands.astype(str)

for year in years:
    # group by year
    df_year = year_group.get_group(year)
    pcs = df_year['Product Category'].unique()
    pc_group = df_year.groupby('Product Category')
    for pc in pcs:
        # group by pcs
        df_pc = pc_group.get_group(pc)
        department_f = df_pc['Department'].unique()
        # sub group by dept
        sub_dept = df_pc.groupby('Department')
        for dept in department_f:
            df_dept = sub_dept.get_group(dept)
            brand_f = df_dept['Brand'].unique()
            sub_brand = df_dept.groupby('Brand')
            for brand in brand_f:
                df_brand = sub_brand.get_group(brand)
                prod_f = df_brand['product'].unique()
                sub_prod = df_brand.groupby('product')
                for prod in prod_f:
                    df_prod = sub_prod.get_group(prod)
                    design_f = df_prod['Design'].unique()
                    sub_design = df_prod.groupby('Design')
                    for des in design_f:
                        df_des = sub_design.get_group(des)
                        color_f = df_des['Color'].unique()
                        sub_col = df_des.groupby('Color')
                        for col in color_f:
                            df_col = sub_col.get_group(col)
                            color_f = df_prod['Color'].unique()
                            sum = sub_col.get_group(col).select_dtypes(include=['float', 'int']).sum()
                            # popularity: total qty sold for the brand
                            popularity = sum['Qty']
                            # total margin for the brand
                            margin = sum['Margin']
                            sales = sum['Amount']
                            sub_data['year'].append(year)
                            sub_data['PC'].append(pc)
                            sub_data['Department'].append(dept)
                            sub_data['Brand'].append(brand)
                            sub_data['Product'].append(prod)
                            sub_data['Design'].append(des)
                            sub_data['Color'].append(col)
                            sub_data['popularity'].append(popularity)
                            sub_data['margin'].append(margin)
                            sub_data['sales'].append(sales)

        # append values to lists

# create dataframe from dictionary
sub_data = pd.DataFrame(sub_data)
sub_data = sub_data[(sub_data['margin'] > 0) & (sub_data['sales'] > 0) & (sub_data['popularity'] > 0)]


data_2022 = sub_data[sub_data['year'] == str(2020)]
# print("Sub data",sub_data)
# print("Data 2022",data_2022)
# data_2022 = sub_data['year'].unique()
# data_2022 = pd.DataFrame(data_2022)
# print(data_2022)


def treemap_popularity_for_product(final_year=End_Year):
    # print(type(sub_data['year'][0]))
    year_wise_data = sub_data[sub_data['year'] == (final_year)]
    # print(final_year)
    fig = px.treemap(data_frame=year_wise_data, path=['PC', 'Department', 'Product', 'Brand', 'popularity'],
                     title=f'Popularity Analysis for Products upto Brand Level ( Year {final_year}  )', color='Brand', values='popularity')
    fig.update_traces(root_color="lightgrey")
    fig.update_layout(margin=dict(t=50, l=25, r=25, b=25))
    # fig.show()
    graphJSON = dumps(fig, cls=PlotlyJSONEncoder)

    return graphJSON

# treemap_popularity_for_product()

def treemap_popularity_for_product_upto_design(final_year=End_Year):
    year_wise_data = sub_data[sub_data['year'] == (final_year)]
    # print(year_wise_data)
    fig = px.treemap(data_frame=year_wise_data,
                     path=['PC', 'Department', 'Product', 'Brand', 'Design', 'Color', 'popularity'],
                     title=f'Popularity Analysis for Products upto Design Level ( Year {final_year}  )', color='Brand', values='popularity')
    fig.update_traces(root_color="lightgrey")
    fig.update_layout(margin=dict(t=50, l=25, r=25, b=25))
    # fig.show()
    graphJSON = dumps(fig, cls=PlotlyJSONEncoder)

    return graphJSON
# treemap_popularity_for_product_upto_design(2021)
# treemap_popularity_for_brand_upto_design(2021)

def treemap_popularity_for_brand(final_year=End_Year):
    # print(final_year)
    year_wise_data = sub_data[sub_data['year'] == (final_year)]
    fig = px.treemap(data_frame=year_wise_data, color='Brand',
                     path=['PC', 'Department', 'Brand', 'Product', 'popularity'],
                     title=f'Popularity Analysis for Brands upto Product level ( Year {final_year}  )', values='popularity')
    fig.update_traces(root_color="lightgrey")
    fig.update_layout(margin=dict(t=50, l=25, r=25, b=25))
    # fig.show()
    graphJSON = dumps(fig, cls=PlotlyJSONEncoder)

    return graphJSON
# treemap_popularity_for_brand(2020)

def treemap_popularity_for_brand_upto_design(final_year=End_Year):
    year_wise_data = sub_data[sub_data['year'] == (final_year)]
    fig = px.treemap(data_frame=year_wise_data, color='Brand',
                     path=['PC', 'Department', 'Brand', 'Product', 'Design', 'Color', 'popularity'],
                     title=f'Popularity Analysis for Brands upto Design level ( Year {final_year}  )', values='popularity')
    fig.update_traces(root_color="lightgrey")
    fig.update_layout(margin=dict(t=50, l=25, r=25, b=25))
    # fig.show()
    graphJSON = dumps(fig, cls=PlotlyJSONEncoder)

    return graphJSON
# treemap_popularity_for_brand_upto_design(2018)

def treemap_margin(final_year=End_Year):
    year_wise_data = sub_data[sub_data['year'] == (final_year)]
    fig = px.treemap(data_frame=year_wise_data, color='Brand', title=f'Margin Analysis for Brands upto Design level ( Year {final_year}  )',
                     path=['PC', 'Department', 'Product', 'Brand', 'margin'])
    fig.update_traces(root_color="lightgrey")
    fig.update_layout(margin=dict(t=50, l=25, r=25, b=25))
    # fig.show()
    graphJSON = dumps(fig, cls=PlotlyJSONEncoder)
    return graphJSON


def treemap_margin_upto_design(final_year=End_Year):
    year_wise_data = sub_data[sub_data['year'] == (final_year)]
    fig = px.treemap(data_frame=year_wise_data, color='Brand', title=f'Margin Analysis for Brands upto Design level ( Year {final_year}  )',
                     path=['PC', 'Department', 'Product', 'Brand', 'Design', 'Color', 'margin'])
    fig.update_traces(root_color="lightgrey")
    fig.update_layout(margin=dict(t=50, l=25, r=25, b=25))
    # fig.show()
    graphJSON = dumps(fig, cls=PlotlyJSONEncoder)

    return graphJSON


def treemap_margin_2(final_year=End_Year):
    year_wise_data = sub_data[sub_data['year'] == (final_year)]
    fig = px.treemap(data_frame=year_wise_data, title=f'Margin Analysis for Brands upto Product Level ( Year {final_year}  )',
                     path=['PC', 'Department', 'Brand', 'Product', 'margin'], color='Brand')
    fig.update_traces(root_color="lightgrey")
    fig.update_layout(margin=dict(t=50, l=25, r=25, b=25))
    # fig.show()

    graphJSON = dumps(fig, cls=PlotlyJSONEncoder)

    return graphJSON


def treemap_margin_2_upto_design(final_year=End_Year):
    year_wise_data = sub_data[sub_data['year'] == (final_year)]
    fig = px.treemap(data_frame=year_wise_data, title=f'Margin Analysis for Brands upto Product Level ( Year {final_year}  )',
                     path=['PC', 'Department', 'Brand', 'Product', 'Design', 'Color', 'margin'], color='Brand')
    fig.update_traces(root_color="lightgrey")
    fig.update_layout(margin=dict(t=50, l=25, r=25, b=25))
    # fig.show()

    graphJSON = dumps(fig, cls=PlotlyJSONEncoder)

    return graphJSON


def scatter_product(final=End_Year):
    data_year_wise = sub_data[sub_data['year'] == (final)]
    # print(data_year_wise)
    fig = px.scatter(data_year_wise, y="Brand", x="margin", color="Product",
                     title=f"Effective Margin Distribution wrt Brand and Product ( Year {final}  )")
    # fig.show()
    graphJSON = dumps(fig, cls=PlotlyJSONEncoder)

    return graphJSON

# scatter_product(2016)
# scatter_product(2015)
# print("sub data ",sub_data)
def scatter_margin(final=End_Year):

    data_year_wise = sub_data[sub_data['year'] == (final)]

    fig = px.scatter(data_year_wise, x="popularity", y="Brand", color="Product",
                     title=f"Effective Popularity Distribution wrt Brand and Product ( Year {final}  )")
    graphJSON = dumps(fig, cls=PlotlyJSONEncoder)
    # fig.show()
    return graphJSON

# scatter_margin(2015)

def scatter_sales(final=End_Year):
    data_year_wise = sub_data[sub_data['year'] == (final)]
    # print(data_year_wise)
    fig = px.scatter(data_year_wise, x="sales", y='Brand', color='Product',
                     title=f"Effective Sales Distribution ( Year {final}  )")
    graphJSON = dumps(fig, cls=PlotlyJSONEncoder)
    # fig.show()
    return graphJSON


# cat1 = 'Brand'
# cat2 = 'product'
#
# def scatter_sales(cat1,cat2):
#   fig = px.scatter(pos_data, x="Amount", y= cat1, color= cat2,
#                  title="Effective Sales Distribution")
#   graphJSON = dumps(fig, cls=PlotlyJSONEncoder)
#
#   return graphJSON

# Payment method Analysis

# df
party_sub = {'Payment':[],'Sale':[],'Year':[]}
# vch_group = pos_data.groupby('Vch No')
# vch_nos = pos_data['Vch No'].unique()

# year_group, years -> party group -> amount
for year in years:
  df_year = year_group.get_group(year)
  # vch no subgroups and unique vale
  party_grp = df_year.groupby('Party')
  party_nos = df_year['Party'].unique()
  # adding values to df lists
  for party in party_nos:
    df_party = party_grp.get_group(party)
    sale = df_party.select_dtypes(include=['float', 'int']).sum()['Amount']
    party_sub['Payment'].append(party)
    party_sub['Sale'].append(sale)
    party_sub['Year'].append(year)


# date_sub['Customer'] = date_sub['Customer'].astype(str)
party_sub = pd.DataFrame(party_sub)
# party_sub.head()


def payment_method(initial=Starting_Year,final=End_Year):
    # print(party_sub)
    new_party_sub = party_sub[(party_sub['Year'] >= str(initial) ) & (party_sub['Year'] <= str(final) )]
    fig = px.sunburst(new_party_sub, path=['Year', 'Payment'], color='Payment', values='Sale',
                      title=f'Different payment methods and their distribution ( from {initial} to {final} )')
    graphJSON = dumps(fig, cls=PlotlyJSONEncoder)
    # fig.show()
    return graphJSON
# payment_method()

# Department
def groupby_details(category, name, from_year, to_year):
    sub_data['year'] = sub_data['year'].astype(int)
    df = sub_data[(sub_data['year'] >= from_year) & (sub_data['year'] <= to_year)]
    df = df.groupby(category).get_group(name)
    sales = df.sum()['sales']
    items = df.sum()['popularity']
    margin = df.sum()['margin']
    # print('Total Sales(qty):', items)
    # print('Total Sales(amount):', sales)
    # print('Total Margin:', margin)
    # display(df)


# groupby_details('Department', 'UNISEX', 2015, 2016)

# groupby_details('Brand', 'AISH', 2014, 2022)

sub_data['year'] = sub_data['year'].astype(int)
dat = sub_data[(sub_data['year'] >= 2016) & (sub_data['year'] <= 2018)]

sub_data['year'] = sub_data['year'].astype(int)


def sorted_margin(n, from_year, to_year):
    df = sub_data[(sub_data['year'] >= from_year) & (sub_data['year'] <= to_year)]
    df = df.sort_values(by='margin', ascending=False)
    # display(df.head(n))


def sorted_sales(n, from_year, to_year):
    df = sub_data[(sub_data['year'] >= from_year) & (sub_data['year'] <= to_year)]
    df = df.sort_values(by='sales', ascending=False)
    # display(df.head(n))


def sorted_qty(n, from_year, to_year):
    df = sub_data[(sub_data['year'] >= from_year) & (sub_data['year'] <= to_year)]
    df = df.sort_values(by='popularity', ascending=False)
    # display(df.head(n))


# sorted_margin(10, 2022, 2022)

# sorted_qty(3, 2016, 2022)

