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

df = pd.read_csv('./Files/total_data_file.csv')
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

def Overall_Sunbust():
    fig=px.sunburst(data_frame=dff,path=['Product Category','Brand','product','Design','Color','size'],maxdepth=2,width=700, height=700)
    # fig.show()
    graphJSON = json.dumps(fig, cls=plotly.utils.PlotlyJSONEncoder)
    return graphJSON

# Overall_Sunbust()

def sunburst_particular_brand_for_product():
    fig=px.sunburst(data_frame=dff,path=['Product Category','product','Brand'],maxdepth=2,width=700, height=700)
    # fig.show()
    graphJSON = json.dumps(fig, cls=plotly.utils.PlotlyJSONEncoder)
    return graphJSON

# sunburst_particular_brand_for_product()


# Tree Maps plots

def treemap_particular_brand_for_product():
    fig3 = px.treemap(dff, path=['product','Brand'], color='Brand')
    # fig3.show()
    graphJSON = json.dumps(fig3, cls=plotly.utils.PlotlyJSONEncoder)
    return graphJSON

# treemap_particular_brand_for_product()

def Overall_treemap():
    fig3 = px.treemap(dff, path=['Product Category','Department','Brand','product','Design','Color','size'])
    # fig3.show()
    graphJSON = json.dumps(fig3, cls=plotly.utils.PlotlyJSONEncoder)
    return graphJSON

# Overall_treemap()


def treemap_brand_similar_product_with_color_design():
    fig3 = px.treemap(dff, path=['Product Category','Department','product','Design','Brand'], color='Brand')
    # fig3.show()
    graphJSON = json.dumps(fig3, cls=plotly.utils.PlotlyJSONEncoder)
    return graphJSON

# treemap_brand_similar_product_with_color_design()

def treemap_brand_similar_product_with_design():
    fig3 = px.treemap(dff, path=['Product Category','Department','product','Design','Brand'], color='Brand')
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
    fig3 = px.treemap(dd3, path=['Brand','product'],values = 'counts')
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

def Treemap_year_product_design_color():
    fig3 = px.treemap(df6, path=['year','product','Design','Color'],values = 'counts')
    # fig3.show()
    graphJSON = json.dumps(fig3, cls=plotly.utils.PlotlyJSONEncoder)
    return graphJSON

# Treemap_year_product_design_color()