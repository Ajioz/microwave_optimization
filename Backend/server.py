from flask import Flask, request
from flask_cors import CORS
from optimization import search, scatter_plot, guassian_plot, compare



app = Flask(__name__)
CORS(app)


@app.route('/execute', methods=['POST'])
def execute_optimiser():

    fields = ['LTX', 'LRX', 'PTX', 'PRX', 'GRX', 'GTX', 'RSX', 'Frequency']
    args = request.get_json()
    response = {}
    flag = False
    my_type = True
    missed_field = []

    #Missing field validation
    for field in fields:
        if field not in args:
            flag = True
            missed_field.append(field)
        response = {"error": f'Opps! seems you missed {missed_field} field(s)'}

    #Field data type validation
    for key, value in args.items():
        if type(value) != int:
            if type(value) != float:
                my_type = False
                response = f'The field {key}, has a value type of String instead of a Number'
         
    if not flag:
        if my_type:
            ltx = args['LTX']
            lrx = args['LRX']
            ptx = args['PTX']
            prx = args['PRX']
            grx = args['GRX']
            gtx = args['GTX']
            rsx = args['RSX']
            freq = args['Frequency']
            response = search(ltx, lrx, ptx, prx, grx, gtx, rsx, freq)
    return response


@app.route('/graph', methods=["POST"])
def generate_graph():

    params = request.get_json()
    fields = ['distance', 'margin', 'FM', 'Av', 'FM_con', 'Av_con']
    response = {}
    my_type = True
    flag = False
    missed_field = []

    #Missing field validation
    for field in fields:
        if field not in params:
            flag = True
            missed_field.append(field)
        response = {"error": f'Opps! seems you missed {missed_field} field(s)'}

    #Field data type validation
    for key, value in params.items():
        if type(value) != int:
            if type(value) != float:
                my_type = False
                response = f'The field {key}, has a value type of String instead of a Number'
                
    if not flag:
        if my_type:
            distance = params['distance']
            margin = params['margin']
            FM = params['FM']
            Av = params['Av']
            FM_con = params['FM_con']
            Av_con = params['Av_conTX']

            scatter = scatter_plot(distance, margin, FM, Av)
            gaussian = guassian_plot(distance)
            comparison = compare(distance, margin, FM_con, Av_con)
            response = {"scatter": scatter, "gaussian": gaussian, "comparison": comparison}

    return response


@app.route('/report', methods=['GET'])
def generate_report():
    return {"status": True}


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
