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
        {"plot":"Bar Plot : Margin , Sales and Effcost","id":1},
        {"plot":'Facets : Bar Plot with months and year',"id":2}
        ]
    elif(var=="margin"):
        return [
        {"plot":'Generalized Analysis : Sunbust',"id":1},
        {"plot":'Brand Vs Product Analysis',"id":2},
        {"plot":'Different Payment Methods',"id":3}
        ]
    elif(var=="maps"):
        return [{"plot": 'Brand and popularity', "id": 1},
                 {"plot": 'Product and popularity', "id": 2},
                 {"plot": 'Brand and Margin', "id": 3},
                 {"plot": 'Product and Margin', "id": 4}
                 ]
    elif(var=="dataanalysis"):
        return [
        # {"plot":"Number of Items in each topic Category","id":1}
        {"plot":'Sunburst Charts',"id":1},
        {"plot":'Tree Map Plots',"id":2}
    ]
    elif(var=="taxonomic"):
        return [
        {"plot": "Taxonomic Analysis with year", "id":1},
        {"plot": "Taxonomic Analysis with year 2", "id":2},
        {"plot": "Taxonomic Analysis without year", "id":3},
        {"plot": "Taxonomic Analysis without year 2", "id":4}
    ]
    elif(var=="treemaps"):
         [
        {"plot":"brand -> product -> design -> color","id":1},
        {"plot":'brand -> product -> design',"id":2},
        {"plot":'brand -> product',"id":3},
        {"plot":'year -> brand -> product -> design',"id":4},
        {"plot":'year -> product -> design -> color',"id":5}
    ]


# Option_dict={
#         "data":
#         [
#         {"plot":"Bar Plot : Margin , Sales and Effcost","id":1},
#         {"plot":'Facets : Bar Plot with months and year',"id":2}
#         ],
#         "margin":
#         [
#         {"plot":'Generalized Analysis : Sunbust',"id":1},
#         {"plot":'Brand Vs Product Analysis',"id":2},
#         {"plot":'Different Payment Methods',"id":3}
#         ],
#         "maps": [{"plot": 'Brand and popularity', "id": 1},
#                  {"plot": 'Product and popularity', "id": 2},
#                  {"plot": 'Brand and Margin', "id": 3},
#                  {"plot": 'Product and Margin', "id": 4}
#                  ]
# }
def Data_Route(id):
        if(id==1):
            return [ry.summary_all_years(), ry.summary_month_margin(), ry.summary_month_sales()]
        elif(id==2):
             return [ry.monthwise_summary(2016, 2022), ry.animated_monthwise_summary()]
def Margin_Route(id):
        if(id==1):
            return [ry.popularity_yearwise(), ry.compare_popularity_yearwise(['JAIPUR MODERN', '11.11', 'OH LA LA']), ry.margin_brands(), ry.popularity_brands()]
        elif(id==2):
             return [ry.scatter_product(), ry.scatter_margin(), ry.scatter_sales()]
        elif(id==3):
            return [ry.payment_method()]
def Tree_Route(id):
        if(id==1):
            return[ry.treemap_popularity_for_product(), ry.treemap_popularity_for_product_upto_design()]
        elif(id==2):
             return [ry.treemap_popularity_for_brand(), ry.treemap_popularity_for_brand_upto_design()]
        elif(id==3):
            return [ry.treemap_margin(), ry.treemap_margin_upto_design()]
        elif(id==4):
            return [ry.treemap_margin_2(), ry.treemap_margin_2_upto_design()]


# Data_dict={
#             1: [ry.summary_all_years(), ry.summary_month_margin(), ry.summary_month_sales()],
#             2: [ry.monthwise_summary(2016, 2022), ry.animated_monthwise_summary()]
# }   
# Margin_dict={
#             1: [ry.popularity_yearwise(), ry.compare_popularity_yearwise(['JAIPUR MODERN', '11.11', 'OH LA LA']), ry.margin_brands(), ry.popularity_brands()],
#             2: [ry.scatter_product(), ry.scatter_margin(), ry.scatter_sales()],
#             3: [ry.payment_method()]
           
# }
# Maps_dict={
#             1: [ry.treemap_popularity_for_product(), ry.treemap_popularity_for_product_upto_design()],
#             2: [ry.treemap_popularity_for_brand(), ry.treemap_popularity_for_brand_upto_design()],
#             3: [ry.treemap_margin(), ry.treemap_margin_upto_design()],
#             4: [ry.treemap_margin_2(), ry.treemap_margin_2_upto_design()]
# }




# JM Store Taxonomic 
# Option_dict_2={
#     "dataanalysis":
#     [
#         # {"plot":"Number of Items in each topic Category","id":1}
#         {"plot":'Sunburst Charts',"id":1},
#         {"plot":'Tree Map Plots',"id":2}
#     ],
#     "taxonomic":
#     [
#         {"plot": "Taxonomic Analysis with year", "id":1},
#         {"plot": "Taxonomic Analysis with year 2", "id":2},
#         {"plot": "Taxonomic Analysis without year", "id":3},
#         {"plot": "Taxonomic Analysis without year 2", "id":4}
#     ],
#     "treemaps":
#     [
#         {"plot":"brand -> product -> design -> color","id":1},
#         {"plot":'brand -> product -> design',"id":2},
#         {"plot":'brand -> product',"id":3},
#         {"plot":'year -> brand -> product -> design',"id":4},
#         {"plot":'year -> product -> design -> color',"id":5}
#     ]
# }

Data_Anyalsis_Dict={
    1:[jmt.sunburst_particular_brand_for_product(),jmt.Overall_Sunbust()],
    2:[jmt.treemap_particular_brand_for_product(),jmt.treemap_brand_similar_product_with_color_design(),jmt.treemap_brand_similar_product_with_design(),jmt.Overall_treemap()],
}
Taxonomic_analysis_dict={
    1:[jmt.year_brand_product(), jmt.product_category_year(), jmt.product_desing_year()],
    2:[jmt.product_year_brand(), jmt.year_product_desing_color(), jmt.year_size()],
    3:[jmt.brand_product_design_color(), jmt.color_desing_product(), jmt.product_size()],
    4:[jmt.product_color(), jmt.product_brand_design(), jmt.brand_product()]
}
Tree_maps_taxonomic_dict={
    1:[jmt.Treemap_brand_product_design_color()],
    2:[jmt.Treemap_brand_product_design()],
    3:[jmt.Treemap_brand_product()],
    4:[jmt.Treemap_year_brand_product()],
    5:[jmt.Treemap_year_brand_product()]
}

@app.route('/')
def home():
    return jsonify(message="JM Store Data Anyalsis"),status.HTTP_200_OK

# Route for Option in Select box
@app.route('/store')
def Choose_Option():
    Fun=(dict(request.args))
    Fun_id=Fun['id'].replace(" ","").lower()
    print(Fun)

    if(Fun_id in ["data","margin","maps","taxonomic","treemaps","dataanalysis"]):
        options=Option_func(Fun['id'])
    #     options=Option_dict[Fun['id']] 
    # elif(Fun_id in Option_dict_2):
    #     options=Option_dict_2[Fun['id']]
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
        graph_id = (request.get_json())['graph']
        
        plot1,plot2,plot3,plot4 = None,None,None,None
        if graph_id == 1:
            # plot1,plot2,plot3=Data_dict[1]
            plot1,plot2,plot3=Data_Route(1)
        elif graph_id == 2:
            plot1,plot2=Data_Route(2)
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
        graph_id = (request.get_json())['graph']
        plot1,plot2,plot3,plot4 = None,None,None,None
        if graph_id == 1:
            plot1,plot2,plot3,plot4=Margin_Route(1)
        elif graph_id == 2:
            plot1,plot2,plot3=Margin_Route(2)
        elif graph_id == 3:
            plot1=Margin_Route(3)
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
        graph_id = (request.get_json())['graph']
        plot1,plot2,plot3,plot4 = None,None,None,None
        if graph_id in [1,2,3,4]:
            # plot1=Maps_dict[graph_id][0]
            plot1=Tree_Route(graph_id)[0]
            plot2=Tree_Route(graph_id)[1]
            # plot2=Maps_dict[graph_id][1]
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


# Route for Tree Maps in Taxonomic Analysis
@app.route('/MapsTaxonomic', methods=['POST', 'GET'])
def Tree_Maps_Taxonomic():
    if request.method == 'POST':
        graph_id = (request.get_json())['graph']
        plot1,plot2,plot3,plot4 = None,None,None,None
        if graph_id in [1,2,3,4,5]:
            plot1=Tree_maps_taxonomic_dict[graph_id][0]
        else:
            return jsonify(message='Invalid Input'),status.HTTP_404_NOT_FOUND
        JSON_Data={
            'plot1':plot1,
            'plot2':plot2,
            'plot3':plot3,
            'plot4':plot4,
            'Topic':'MapsTaxonomic',
            'Option':Option_func('treemaps'),
            'display_option':True
        }
        return jsonify(JSON_Data),status.HTTP_200_OK
    
# Route for Taxonomic Analysis
@app.route('/Taxonomic', methods=['POST', 'GET'])
def Taxonomic_analysis():
    if request.method == 'POST':
        graph_id = (request.get_json())['graph']
        plot1,plot2,plot3,plot4 = None,None,None,None
        if graph_id in [1,2,3,4]:
            plot1=Taxonomic_analysis_dict[graph_id][0]
            plot2=Taxonomic_analysis_dict[graph_id][1]
            plot3=Taxonomic_analysis_dict[graph_id][2]
        else:
            return jsonify(message='Invalid Input'),status.HTTP_404_NOT_FOUND
        JSON_Data={
            'plot1':plot1,
            'plot2':plot2,
            'plot3':plot3,
            'plot4':plot4,
            'Topic':'Taxonomic',
            'Option':Option_func('taxonomic'),
            'display_option':True
        }
        return jsonify(JSON_Data),status.HTTP_200_OK


# Route for Data in Taxonomic Analysis
@app.route('/DataTaxonomic', methods=['POST', 'GET'])
def Data_Anaylsis_Taxonomic():
    if request.method == 'POST':
        graph_id = (request.get_json())['graph']
        plot1,plot2,plot3,plot4 = None,None,None,None
        if graph_id==2:
            plot1,plot2=Data_Anyalsis_Dict[graph_id]
        elif graph_id==3:
            plot1,plot2,plot3,plot4=Data_Anyalsis_Dict[graph_id]
        else:
            return jsonify(message='Invalid Input'),status.HTTP_404_NOT_FOUND
        JSON_Data={
            'plot1':plot1,
            'plot2':plot2,
            'plot3':plot3,
            'plot4':plot4,
            'Topic':'DataTaxonomic',
            'Option':Option_func('dataanalysis'),
            'display_option':True
        }
        return jsonify(JSON_Data),status.HTTP_200_OK


if __name__ == '__main__':
    app.run(debug=True)