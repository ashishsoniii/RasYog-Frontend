from flask import Flask, render_template, request,jsonify
import JM_Store as ry
import JM_stor_taxonomic as jmt
import warnings
from flask_api import status
from flask_cors import CORS


warnings.filterwarnings('ignore')

app = Flask(__name__)
CORS(app)

def Option_func(var):
    if(var=="data"):
        return [
        {"plot":"Bar Plot : Margin , Sales and Effcost","id":1,"YearChange":False,"SingleYear":False},
        {"plot":'Facets : Bar Plot with months and year',"id":2,"YearChange":True,"SingleYear":False}
        ]
    elif(var=="margin"):
        return [
        {"plot":'Generalized Analysis : Sunbust',"id":1,"YearChange":True,"SingleYear":False},
        {"plot":'Brand Vs Product Analysis',"id":2,"YearChange":True,"SingleYear":True},
        {"plot":'Different Payment Methods',"id":3,"YearChange":True,"SingleYear":False}
        ]
    elif(var=="maps"):
        return [{"plot": 'Brand and popularity', "id": 1,"YearChange":True,"SingleYear":True},
                 {"plot": 'Product and popularity', "id": 2,"YearChange":True,"SingleYear":True},
                 {"plot": 'Brand and Margin', "id": 3,"YearChange":True,"SingleYear":True},
                 {"plot": 'Product and Margin', "id": 4,"YearChange":True,"SingleYear":True}
                 ]
    elif(var=="datataxonomic"):
        return [
        # {"plot":"Number of Items in each topic Category","id":1}
        {"plot":'Sunburst Charts',"id":1,"YearChange":True,"SingleYear":False},
        {"plot":'Tree Map Plots',"id":2,"YearChange":True,"SingleYear":False}
    ]
    elif(var=="taxonomic"):
        return [
        {"plot": "Taxonomic Analysis with year", "id":1,"YearChange":False,"SingleYear":False},
        {"plot": "Taxonomic Analysis with year of product design color and size", "id":2,"YearChange":False,"SingleYear":False},
        {"plot": "Taxonomic Analysis without year", "id":3,"YearChange":False,"SingleYear":False},
        {"plot": "Taxonomic Analysis without year product color and design", "id":4,"YearChange":False,"SingleYear":False}
    ]
    elif(var=="mapstaxonomic"):
        return [
        {"plot":"Brand -> Product -> Design -> Color","id":1,"YearChange":False,"SingleYear":False},
        {"plot":'Brand -> Product -> Design',"id":2,"YearChange":False,"SingleYear":False},
        {"plot":'Brand -> Product',"id":3,"YearChange":False,"SingleYear":False},
        {"plot":'Year -> Brand -> Product -> Design',"id":4,"YearChange":False,"SingleYear":False},
        {"plot":'Year -> Product -> Design -> Color',"id":5,"YearChange":False,"SingleYear":False}
    ]


def Data_Route(id,start,end):
        if(id==1):
            return [ry.summary_all_years(), ry.summary_month_margin(), ry.summary_month_sales()]
        elif(id==2):
             return [ry.monthwise_summary(start,end), ry.animated_monthwise_summary()]
def Margin_Route(id,start,end):
        if(id==1):
            return [ry.popularity_yearwise(start,end), ry.compare_popularity_yearwise(['JAIPUR MODERN', '11.11', 'OH LA LA'],start,end), ry.margin_brands(start,end), ry.popularity_brands(start,end)]
        elif(id==2):
             return [ry.scatter_product(end), ry.scatter_margin(end), ry.scatter_sales(end)]
        elif(id==3):
            return [ry.payment_method(start,end)]
def Tree_Route(id,end):
        if(id==1):
            return[ry.treemap_popularity_for_product(final_year=end), ry.treemap_popularity_for_product_upto_design(final_year=end)]
        elif(id==2):
             return [ry.treemap_popularity_for_brand(final_year=end), ry.treemap_popularity_for_brand_upto_design(final_year=end)]
        elif(id==3):
            return [ry.treemap_margin(final_year=end), ry.treemap_margin_upto_design(final_year=end)]
        elif(id==4):
            return [ry.treemap_margin_2(final_year=end), ry.treemap_margin_2_upto_design(final_year=end)]


# def Data_Taxonomic_Route(id,start,end):
#         if(id==1):
#             return [jmt.sunburst_particular_brand_for_product(start,end),jmt.Overall_Sunbust(start,end)]
#         elif(id==2):
#              return [jmt.treemap_particular_brand_for_product(start,end),jmt.treemap_brand_similar_product_with_color_design(start,end),jmt.treemap_brand_similar_product_with_design(start,end),jmt.Overall_treemap(start,end)]
        
# def Taxonomic_Route(id):
#         if(id==1):
#             plot1=jmt.year_brand_product()
#             plot2=jmt.product_category_year()
#             plot3=jmt.product_desing_year()
#             return plot1,plot2,plot3
#         elif(id==2):
#              return [jmt.product_year_brand(), jmt.year_product_desing_color(), jmt.year_size()]
#         elif(id==3):
#             return [jmt.brand_product_design_color(), jmt.color_desing_product(), jmt.product_size()]
#         elif(id==4):
#             return [jmt.product_color(), jmt.product_brand_design(), jmt.brand_product()]

def TreeMap_Taxonomic_Route(id):
        if(id==1):
            return [jmt.Treemap_brand_product_design_color()]
        elif(id==2):
             return [jmt.Treemap_brand_product_design()]
        elif(id==3):
            return [jmt.Treemap_brand_product()]
        elif(id==4):
            return [jmt.Treemap_year_brand_product()]
        elif(id==5):
            return [jmt.Treemap_year_product_design_color()]


@app.route('/')
def home():
    return jsonify(message="JM Store Data Anyalsis"),status.HTTP_200_OK

# Route for Option in Select box
@app.route('/store')
def Choose_Option():
    Fun=(dict(request.args))
    Fun_id=Fun['id'].replace(" ","").lower()
    # print(Fun)

    if(Fun_id in ["data","margin","maps","taxonomic","mapstaxonomic","datataxonomic"]):
        options=Option_func(Fun['id'])
    else:
        return jsonify(message='Invalid Input'),status.HTTP_404_NOT_FOUND
    
    graph_data={
            "plot_name":options,
            "Topic":Fun['id'],
            "display_option":True
        }
    return jsonify(graph_data),status.HTTP_200_OK

# Route for Data Analysis        
@app.route('/data', methods=['POST'])
def data_graph():
    if request.method == 'POST':
        graphInfo= (request.get_json())
        graph_id=graphInfo["graph"]
        from_year=int(graphInfo['starting'])
        to_year=int(graphInfo['end'])
        plot1,plot2,plot3,plot4 = None,None,None,None
        if graph_id == 1:
            # plot1,plot2,plot3=Data_dict[1]
            plot1,plot2,plot3=Data_Route(1,from_year,to_year)
        elif graph_id == 2:
            plot1,plot2=Data_Route(2,from_year,to_year)
        else:
             return jsonify(message='Invalid Input'),status.HTTP_404_NOT_FOUND
        
        JSON_Data={
            'plot1':plot1,
            'plot2':plot2,
            'plot3':plot3,
            'plot4':plot4,
            'Topic':'data',
            'Options':Option_func("data"),
            'display_option':True
        }
        return jsonify(JSON_Data),status.HTTP_200_OK



# Route for Popularity and Margin Analysis
@app.route('/margin', methods=['POST'])
def margin_graph():
    if request.method == 'POST':
        graphInfo= (request.get_json())
        graph_id=int(graphInfo["graph"])
        from_year=int(graphInfo['starting'])
        to_year=int(graphInfo['end'])
        plot1,plot2,plot3,plot4 = None,None,None,None
        if graph_id == 1:
            plot1,plot2,plot3,plot4=Margin_Route(1,start=from_year,end=to_year)
        elif graph_id == 2:
            plot1,plot2,plot3=Margin_Route(2,start=from_year,end=to_year)
        elif graph_id == 3:
            plot1=Margin_Route(3,start=from_year,end=to_year)
        else:
            return jsonify(message='Invalid Input'),status.HTTP_404_NOT_FOUND
        JSON_Data={
            'plot1':plot1,
            'plot2':plot2,
            'plot3':plot3,
            'plot4':plot4,
            'Topic':'margin',
            'Option':Option_func('margin'),
            'display_option':True
        }
        return jsonify(JSON_Data),status.HTTP_200_OK


# Route for Tree Maps
@app.route('/maps', methods=['POST'])
def TreeMaps_graph():
    if request.method == 'POST':
        graphInfo=(request.get_json())
        graph_id=int(graphInfo["graph"])
        from_year=int(graphInfo['starting'])
        to_year=int(graphInfo['end'])
        plot1,plot2,plot3,plot4 = None,None,None,None
        if graph_id in [1,2,3,4]:
            plot1=Tree_Route(graph_id,to_year)[0]
            plot2=Tree_Route(graph_id,to_year)[1]
        else:
           return jsonify(message='Invalid Input'),status.HTTP_404_NOT_FOUND
        JSON_Data={
            'plot1':plot1,
            'plot2':plot2,
            'plot3':plot3,
            'plot4':plot4,
            'Topic':'maps',
            'Option':Option_func('maps'),
            'display_option':True
        }
        return jsonify(JSON_Data),status.HTTP_200_OK

# 
# Route for Tree Maps in Taxonomic Analysis
@app.route('/mapstaxonomic', methods=['POST', 'GET'])
def Tree_Maps_Taxonomic():
    if request.method == 'POST':
        graphInfo= (request.get_json())
        graph_id=int(graphInfo["graph"])
        from_year=int(graphInfo['starting'])
        to_year=int(graphInfo['end'])
        plot1,plot2,plot3,plot4 = None,None,None,None
        if graph_id in [1,2,3,4,5]:
            plot1=TreeMap_Taxonomic_Route(graph_id)[0]
        else:
            return jsonify(message='Invalid Input'),status.HTTP_404_NOT_FOUND
        JSON_Data={
            'plot1':plot1,
            'plot2':plot2,
            'plot3':plot3,
            'plot4':plot4,
            'Topic':'mapstaxonomic',
            'Option':Option_func('mapstaxonomic'),
            'display_option':True
        }
        return jsonify(JSON_Data),status.HTTP_200_OK
    
# Route for Taxonomic Analysis
@app.route('/taxonomic', methods=['POST', 'GET'])
def Taxonomic_analysis():
    if request.method == 'POST':
        graphInfo= (request.get_json())
        graph_id=int(graphInfo["graph"])
        from_year=(int(graphInfo['starting']))
        to_year=int(graphInfo['end'])
        plot1,plot2,plot3,plot4 = None,None,None,None
        if graph_id==1:
            # plot1=Taxonomic_Route(graph_id)[0]
            # plot2=Taxonomic_Route(graph_id)[1]
            # plot3=Taxonomic_Route(graph_id)[2]
            plot1=jmt.year_brand_product()
            plot2=jmt.product_category_year()
            plot3=jmt.product_desing_year()
        elif graph_id==2:
            plot1=jmt.product_year_brand()
            plot2=jmt.year_product_desing_color()
            plot3=jmt.year_size()
        elif graph_id==3:
            plot1=jmt.brand_product_design_color()
            plot2=jmt.color_desing_product()
            plot3=jmt.product_size()
        elif graph_id==4:
            plot1=jmt.product_color()
            plot2=jmt.product_brand_design()
            plot3=jmt.brand_product()
        else:
            return jsonify(message='Invalid Input'),status.HTTP_404_NOT_FOUND
        JSON_Data={
            'plot1':plot1,
            'plot2':plot2,
            'plot3':plot3,
            'plot4':plot4,
            'Topic':'taxonomic',
            'Option':Option_func('taxonomic'),
            'display_option':True
        }
        return jsonify(JSON_Data),status.HTTP_200_OK


# Route for Data in Taxonomic Analysis
@app.route('/datataxonomic', methods=['POST', 'GET'])
def Data_Anaylsis_Taxonomic():
    if request.method == 'POST':
        graphInfo= (request.get_json())
        graph_id=int(graphInfo["graph"])
        from_year=int(graphInfo['starting'])
        to_year=int(graphInfo['end'])
        plot1,plot2,plot3,plot4 = None,None,None,None
        if graph_id==1:
            # plot1=Data_Taxonomic_Route(graph_id,from_year,to_year)[0]
            # plot2=Data_Taxonomic_Route(graph_id,from_year,to_year)[1]
            plot1=jmt.sunburst_particular_brand_for_product()
            plot2=jmt.Overall_Sunbust()
        elif graph_id==2:
            # plot1=Data_Taxonomic_Route(graph_id,from_year,to_year)[0]
            # plot2=Data_Taxonomic_Route(graph_id,from_year,to_year)[1]
            # plot3=Data_Taxonomic_Route(graph_id,from_year,to_year)[1]
            # plot4=Data_Taxonomic_Route(graph_id,from_year,to_year)[1]
            plot1=jmt.treemap_particular_brand_for_product(from_year,to_year)
            plot2=jmt.treemap_brand_similar_product_with_color_design(from_year,to_year)
            plot3=jmt.treemap_brand_similar_product_with_design(from_year,to_year)
            plot4=jmt.Overall_treemap(from_year,to_year)
        else:
            return jsonify(message='Invalid Input'),status.HTTP_404_NOT_FOUND
        JSON_Data={
            'plot1':plot1,
            'plot2':plot2,
            'plot3':plot3,
            'plot4':plot4,
            'Topic':'datataxonomic',
            'Option':Option_func('datataxonomic'),
            'display_option':True
        }
        return jsonify(JSON_Data),status.HTTP_200_OK


if __name__ == '__main__':
    app.run(debug=True)