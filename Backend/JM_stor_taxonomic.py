import numpy as np
import matplotlib.pyplot as plt
import pandas as pd
import warnings
warnings.filterwarnings('ignore')
import seaborn as sns
import io

import plotly
import plotly.express as px
import json

# Import the necessaries libraries
import plotly.offline as pyo
import plotly.graph_objs as go

df = pd.read_csv('./total_data_file.csv')
df=df.drop(['Size','Unnamed: 0'], axis = 1)
dff = df[['Date','Product Category','Department','Brand','product','Design','Color','size','Qty']]


dff['Date'] = pd.to_datetime(dff['Date'])
dff['year'] = dff['Date'].dt.year
dff['month'] = dff['Date'].dt.month

# set(dff['Product Category'])
# set(dff['Department'])
# set(dff['Brand'])

# for col in dff.columns:
#     print(f'Number of {col} unique values: {dff[col].nunique()}')

df2022 = dff
include = df2022[df2022['year'] == 2022]
exclude = df2022[df2022['year'] != 2022]

# Sunburst Charts

def Overall_Sunbust(initial=2014,final=2022):
    # print(dff)
    new_dff = dff[(dff['Date'].dt.year >= (initial) ) & (dff['Date'].dt.year<= (final) )]
    # print(new_dff)

    fig=px.sunburst(data_frame=new_dff,path=['Product Category','Brand','product','Design','Color','size'],maxdepth=2,width=700, height=700,title="Overall Sunburst")
    # fig.show()
    graphJSON = json.dumps(fig, cls=plotly.utils.PlotlyJSONEncoder)
    return graphJSON

# Overall_Sunbust()

def sunburst_particular_brand_for_product(initial=2014,final=2022):

    new_dff = dff[(dff['Date'].dt.year >= (initial) ) & (dff['Date'].dt.year<= (final) )]
    # print(new_dff)
    fig=px.sunburst(data_frame=new_dff,path=['Product Category','product','Brand'],maxdepth=2,width=700, height=700,title=" Sunburst Plot for Particular Brand for a Product ")
    # fig.show()
    graphJSON = json.dumps(fig, cls=plotly.utils.PlotlyJSONEncoder)
    return graphJSON

# sunburst_particular_brand_for_product()


# Tree Maps plots

def treemap_particular_brand_for_product(initial=2014,final=2022):
    # print(dff)
    new_dff = dff[(dff['Date'].dt.year >= (initial) ) & (dff['Date'].dt.year<= (final) )]
    # print(new_dff)
    fig3 = px.treemap(new_dff, path=['product','Brand'], color='Brand',title="Treemap for Particular Brand for a Product ")
    # fig3.show()
    graphJSON = json.dumps(fig3, cls=plotly.utils.PlotlyJSONEncoder)
    return graphJSON

# treemap_particular_brand_for_product()

def Overall_treemap(initial=2014,final=2022):
    new_dff = dff[(dff['Date'].dt.year >= (initial) ) & (dff['Date'].dt.year<= (final) )]
    
    fig3 = px.treemap(new_dff, path=['Product Category','Department','Brand','product','Design','Color','size'],title="Overall Treemap")
    # fig3.show()
    graphJSON = json.dumps(fig3, cls=plotly.utils.PlotlyJSONEncoder)
    return graphJSON

# Overall_treemap()


def treemap_brand_similar_product_with_color_design(initial=2014,final=2022):
    new_dff = dff[(dff['Date'].dt.year >= (initial) ) & (dff['Date'].dt.year<= (final) )]

    fig3 = px.treemap(new_dff, path=['Product Category','Department','product','Design','Brand'], color='Brand')
    # fig3.show()
    graphJSON = json.dumps(fig3, cls=plotly.utils.PlotlyJSONEncoder)
    return graphJSON

# treemap_brand_similar_product_with_color_design()

def treemap_brand_similar_product_with_design(initial=2014,final=2022):
    new_dff = dff[(dff['Date'].dt.year >= (initial) ) & (dff['Date'].dt.year<= (final) )]
    fig3 = px.treemap(new_dff, path=['Product Category','Department','product','Design','Brand'], color='Brand')
    # fig3.show()
    graphJSON = json.dumps(fig3, cls=plotly.utils.PlotlyJSONEncoder)
    return graphJSON

# treemap_brand_similar_product_with_design()

# treemap_brand_similar_product()

df3 = dff[['year','Product Category','Brand','product','Design','Color']]
dd = df3.value_counts()
dd=dd.reset_index(name = 'counts')



dd1=dd[['Brand', 'product', 'Design' ,'Color']]
dd1 = dd1.value_counts()
dd1=dd1.reset_index(name = 'counts')

# Treemap brand -> product -> design -> color

def Treemap_brand_product_design_color():
    fig3 = px.treemap(dd1, path=['Brand','product','Design','Color'],values = 'counts')
    # fig3.show()
    graphJSON = json.dumps(fig3, cls=plotly.utils.PlotlyJSONEncoder)
    return graphJSON
# Treemap_brand_product_design_color()


dd2=dd[['Brand', 'product', 'Design']]
dd2 = dd2.value_counts()
dd2=dd2.reset_index(name = 'counts')



# Treemap brand -> product -> design

def Treemap_brand_product_design():
    fig3 = px.treemap(dd2, path=['Brand','product','Design'],values = 'counts')
    # fig3.show()
    graphJSON = json.dumps(fig3, cls=plotly.utils.PlotlyJSONEncoder)
    return graphJSON
# Treemap_brand_product_design()


dd3=dd[['Brand', 'product']]
dd3 = dd3.value_counts()
dd3=dd3.reset_index(name = 'counts')


# Treemap brand -> product

def Treemap_brand_product():
    fig3 = px.treemap(dd3, path=['Brand','product'],values = 'counts',title="Tree Map for Brand & Product")
    # fig3.show()
    graphJSON = json.dumps(fig3, cls=plotly.utils.PlotlyJSONEncoder)
    return graphJSON

# Treemap_brand_product()

df5 = dff[['year','Brand','product']]
df5 = df5.value_counts()
df5 = df5.reset_index(name = 'counts')


# Treemap year -> brand -> product

def Treemap_year_brand_product():
    fig3 = px.treemap(df5, path=['year','Brand','product'],values = 'counts')
    # fig3.show()
    graphJSON = json.dumps(fig3, cls=plotly.utils.PlotlyJSONEncoder)
    return graphJSON

# Treemap_year_brand_product()

df6 = dff[['year','product','Design','Color']]
df6 = df6.value_counts()
df6 = df6.reset_index(name = 'counts')


# Treemap year -> product -> design -> color

def Treemap_year_product_design_color(initial=2019,final=2020):
    # print(df6)
    df = df6[(df6['year'] >= (initial) ) & (df6['year'] <= (final) )]
    # print(df)
    fig3 = px.treemap(df, path=['year','product','Design','Color'],values = 'counts')
    # fig3.show()
    graphJSON = json.dumps(fig3, cls=plotly.utils.PlotlyJSONEncoder)
    return graphJSON

Treemap_year_product_design_color()


# TAXONOMIC ANALYSIS

df2 = dff[['year','Product Category','Brand','product','Design','Color']]
gkk=df2.groupby(['year','Product Category','Brand','product','Design','Color'])
# gkk.first()
df2 = df2.value_counts()

df2=df2.reset_index(name = 'counts')
df10 = df2
df10['counts'] = 1
# print(type(df10['year']))
def year_brand_product():
    fig3 = px.treemap(df10, path=['year','Brand','product'],values = 'counts')
    graphJSON = json.dumps(fig3, cls=plotly.utils.PlotlyJSONEncoder)
    return graphJSON

def product_category_year():
    fig3 = px.treemap(df10, path=['year','Product Category','Brand','product'],values = 'counts')
    graphJSON = json.dumps(fig3, cls=plotly.utils.PlotlyJSONEncoder)
    return graphJSON

df3 = dff[['year','Product Category','Brand','product','Design','Color']]
dd = df3.value_counts()
dd=dd.reset_index(name = 'counts')
dd['counts']=1

def product_desing_year():
    fig3 = px.treemap(dd, path=['Brand','product','Design','Color'],values = 'counts')
    graphJSON = json.dumps(fig3, cls=plotly.utils.PlotlyJSONEncoder)
    return graphJSON


dd1=dd[['Brand', 'product', 'Design' ,'Color']]
dd1 = dd1.value_counts()
dd1=dd1.reset_index(name = 'counts')
dd1['counts']=1

def brand_product_design_color():
    fig3 = px.treemap(dd1, path=['Brand','product','Design','Color'],values = 'counts')
    graphJSON = json.dumps(fig3, cls=plotly.utils.PlotlyJSONEncoder)
    return graphJSON


dd4=dd[['product' ,'Color']]
dd4 = dd4.value_counts()
dd4=dd4.reset_index(name = 'counts')
dd4['counts']=1

def product_color():
    fig3 = px.treemap(dd4, path=['product','Color'],values = 'counts')
    graphJSON = json.dumps(fig3, cls=plotly.utils.PlotlyJSONEncoder)
    return graphJSON

dd2=dd[['Brand', 'product', 'Design']]
dd2 = dd2.value_counts()
dd2=dd2.reset_index(name = 'counts')
dd2['counts']=1

def product_brand_design():
    fig3 = px.treemap(dd2, path=['Brand','product','Design'],values = 'counts')
    graphJSON = json.dumps(fig3, cls=plotly.utils.PlotlyJSONEncoder)
    return graphJSON

dd3=dd[['Brand', 'product']]
dd3 = dd3.value_counts()
dd3=dd3.reset_index(name = 'counts')
dd3['counts']=1

def brand_product():
    fig3 = px.treemap(dd3, path=['Brand','product'],values = 'counts')
    graphJSON = json.dumps(fig3, cls=plotly.utils.PlotlyJSONEncoder)
    return graphJSON

df5 = dff[['year','Brand','product']]
df5 = df5.value_counts()
df5 = df5.reset_index(name = 'counts')
df5['counts']=1

def product_year_brand():
    fig3 = px.treemap(df5, path=['year','Brand','product'],values = 'counts')
    graphJSON = json.dumps(fig3, cls=plotly.utils.PlotlyJSONEncoder)
    return graphJSON

df6 = dff[['year','product','Design','Color']]
df6 = df6.value_counts()
df6 = df6.reset_index(name = 'counts')
df6['counts']=1

def year_product_desing_color():
    fig3 = px.treemap(df6, path=['year','product','Design','Color'],values = 'counts')
    graphJSON = json.dumps(fig3, cls=plotly.utils.PlotlyJSONEncoder)
    return graphJSON

df7 = dff[['product','Design','Color']]
df7 = df7.value_counts()
df7 = df7.reset_index(name = 'counts')
df7['counts']=1
print(df7)
def color_desing_product():
    fig3 = px.treemap(df7, path=['product','Design','Color'],values = 'counts')
    graphJSON = json.dumps(fig3, cls=plotly.utils.PlotlyJSONEncoder)
    return graphJSON


df8 = dff[['year','product','Design','Color','size']]
df8 = df8.value_counts()
df8 = df8.reset_index(name = 'counts')

def year_size():
    fig3 = px.treemap(df8, path=['year','product','Design','Color','size'],values = 'counts')
    graphJSON = json.dumps(fig3, cls=plotly.utils.PlotlyJSONEncoder)
    return graphJSON

df9 = dff[['product','Design','Color','size']]
df9 = df9.value_counts()
df9 = df9.reset_index(name = 'counts')

def product_size():
    fig3 = px.treemap(df9, path=['product','Design','Color','size'],values = 'counts')
    graphJSON = json.dumps(fig3, cls=plotly.utils.PlotlyJSONEncoder)
    return graphJSON

