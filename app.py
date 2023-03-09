from flask import Flask, render_template, request,jsonify
import JM_Store as ry
import warnings

warnings.filterwarnings('ignore')

app = Flask(__name__)

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
        {"plot":'Popularity Vs Margin for Brands',"id":3}
        ],
        "maps":['Other Graph','Some more graph']
}
Data_dict={
            1: [ry.summary_all_years(), ry.summary_month_margin(), ry.summary_month_sales()],
            2: [ry.monthwise_summary(2015, 2016), ry.animated_monthwise_summary()]
}   
Margin_dict={
            1: [ry.popularity_yearwise(), ry.compare_popularity_yearwise(['JAIPUR MODERN', '11.11', 'OH LA LA']), ry.margin_brands(), ry.popularity_brands()],
            2: [ry.monthwise_summary(2015, 2016), ry.animated_monthwise_summary()]
}


@app.route('/')
def home():
    return jsonify(message="JM Store Data Anyalsis")
    # return render_template('graph.html',display_option=False)

#Route for Option in Select box
@app.route('/store')
def Choose_Option():
    Fun=(dict(request.args))
    options=Option_dict[Fun['id']]
    graph_data={
        "plot_name":options,
        "Topic":Fun['id'],
        "display_option":True
    }
    return jsonify(graph_data)
    # return render_template('graph.html',var=Mylist,Topic=FUn['id'],display_option="True")



# Route for Data Analysis        
@app.route('/data', methods=['POST', 'GET'])
def data_graph():
    if request.method == 'POST':
        graph_id = (request.get_json())['graph']
        
        plot1,plot2,plot3,plot4 = None,None,None,None
        if graph_id == 1:
            plot1,plot2,plot3=Data_dict[1]
        elif graph_id == 2:
            plot1,plot2=Data_dict[2]
        else:
             return jsonify(message='Invalid Input')
        JSON_Data={
            'plot1':plot1,
            'plot2':plot2,
            'plot3':plot3,
            'plot4':plot4,
            'Topic':'data',
            'Options':Option_dict['data'],
            'display_option':True
        }
        return jsonify(JSON_Data)
        # return render_template('graph.html', plot1=plot1, plot2=plot2, plot3=plot3, plot4=plot4,var=data,Topic='data',display_option=True)
    # elif request.method == 'GET':
    #     return render_template('graph.html')


# Route for Popularity and Margin Analysis
@app.route('/margin', methods=['POST', 'GET'])
def margin_graph():
    if request.method == 'POST':
        graph_id = (request.get_json())['graph']
        plot1,plot2,plot3,plot4 = None,None,None,None
        if graph_id == 1:
            plot1,plot2,plot3,plot4=Margin_dict[1]
        elif graph_id == 2:
            plot1,plot2=Margin_dict[2]
        else:
             return jsonify(message='Invalid Input')
        JSON_Data={
            'plot1':plot1,
            'plot2':plot2,
            'plot3':plot3,
            'plot4':plot4,
            'Topic':'margin',
            'Option':Option_dict['margin'],
            'display_option':True
        }
        return jsonify(JSON_Data)
        # return render_template('graph.html', plot1=plot1, plot2=plot2, plot3=plot3, plot4=plot4, var=margin, Topic='margin',display_option="True")
    # elif request.method == 'GET':
    #     return render_template('graph.html')

# Route for Tree Maps
@app.route('/Treemaps', methods=['POST', 'GET'])
def TreeMaps_graph():
    if request.method == 'POST':
        graph_id = (request.get_json())['graph']
        plot1,plot2,plot3,plot4 = None,None,None,None


if __name__ == '__main__':
    app.run(debug=True)