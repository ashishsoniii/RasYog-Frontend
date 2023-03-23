from flask import Flask, render_template, request,jsonify
import JM_Store as ry
import JM_stor_taxonomic as jmt
import warnings
from flask_api import status
from flask_cors import CORS


warnings.filterwarnings('ignore')

app = Flask(__name__)
CORS(app)

Option_dict={
        "data":
        [
        {"plot":"Bar Plot : Margin , Sales and Effcost","id":1},
        {"plot":'Facets : Bar Plot with months and year',"id":2}
        ],
        "margin":
        [
        {"plot":'Generalized Analysis : Sunbust',"id":1},
        {"plot":'Brand Vs Product Analysis',"id":2},
        {"plot":'Different Payment Methods',"id":3}
        ],
        "maps": [{"plot": 'Brand and popularity', "id": 1},
                 {"plot": 'Product and popularity', "id": 2},
                 {"plot": 'Brand and Margin', "id": 3},
                 {"plot": 'Product and Margin', "id": 4}
                 ]
}
Data_dict={
            1: [ry.summary_all_years(), ry.summary_month_margin(), ry.summary_month_sales()],
            2: [ry.monthwise_summary(2016, 2022), ry.animated_monthwise_summary()]
}   
Margin_dict={
            1: [ry.popularity_yearwise(), ry.compare_popularity_yearwise(['JAIPUR MODERN', '11.11', 'OH LA LA']), ry.margin_brands(), ry.popularity_brands()],
            2: [ry.scatter_product(), ry.scatter_margin(), ry.scatter_sales()],
            3: [ry.payment_method()]
           
}
Maps_dict={
            1: [ry.treemap_popularity()],
            2: [ry.treemap_popularity_2()],
            3: [ry.treemap_margin()],
            4: [ry.treemap_margin_2()]
}

# JM Store Taxonomic 
Option_dict_2={
    "dataanalysis":
    [
        {"plot":"Number of Items in each topic Category","id":1},
        {"plot":'Sunburst Charts',"id":2},
        {"plot":'Tree Map Plots',"id":3}
    ],
    "taxonomic":
    [
    
    ],
    "treemaps":
    [
        {"plot":"brand -> product -> design -> color","id":1},
        {"plot":'brand -> product -> design',"id":2},
        {"plot":'brand -> product',"id":3},
        {"plot":'year -> brand -> product -> design',"id":4},
        {"plot":'year -> product -> design -> color',"id":5}
    ]
}

Data_Anyalsis_Dict={
    1:[],
    2:[jmt.sunburst_particular_brand_for_product(),jmt.Overall_Sunbust()],
    3:[jmt.treemap_particular_brand_for_product(),jmt.treemap_brand_similar_product_with_color_design(),jmt.treemap_brand_similar_product_with_design(),jmt.Overall_treemap()],
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
    # print(Fun)

    if(Fun_id in Option_dict):
        options=Option_dict[Fun['id']] 
    
    elif(Fun_id in Option_dict_2):
        options=Option_dict_2[Fun['id']]

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
            plot1,plot2,plot3=Data_dict[1]
        elif graph_id == 2:
            plot1,plot2=Data_dict[2]
        else:
             return jsonify(message='Invalid Input'),status.HTTP_404_NOT_FOUND
        
        JSON_Data={
            'plot1':plot1,
            'plot2':plot2,
            'plot3':plot3,
            'plot4':plot4,
            'Topic':'data',
            'Options':Option_dict['data'],
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
            plot1,plot2,plot3,plot4=Margin_dict[1]
        elif graph_id == 2:
            plot1,plot2,plot3=Margin_dict[2]
        elif graph_id == 3:
            plot1=Margin_dict[3]
        else:
            return jsonify(message='Invalid Input'),status.HTTP_404_NOT_FOUND
        JSON_Data={
            'plot1':plot1,
            'plot2':plot2,
            'plot3':plot3,
            'plot4':plot4,
            'Topic':'margin',
            'Option':Option_dict['margin'],
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
            plot1=Tree_maps_taxonomic_dict[graph_id][0]
        else:
           return jsonify(message='Invalid Input'),status.HTTP_404_NOT_FOUND
        JSON_Data={
            'plot1':plot1,
            'plot2':plot2,
            'plot3':plot3,
            'plot4':plot4,
            'Topic':'maps',
            'Option':Option_dict['maps'],
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
            'Topic':'mapsTaxonomic',
            'Option':Option_dict_2['treemaps'],
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
            'Option':Option_dict_2['dataanalysis'],
            'display_option':True
        }
        return jsonify(JSON_Data),status.HTTP_200_OK


if __name__ == '__main__':
    app.run(debug=True)