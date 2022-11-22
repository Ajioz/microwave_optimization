from flask import Flask, request
from flask_cors import CORS
from optimization import search, scatter_plot, guassian_plot, compare


app = Flask(__name__)
CORS(app)


@app.route('/execute', methods=['POST'])
def execute_optimiser():
    
    fields = ['LTX','LRX','PTX','PRX','GRX','GTX','RSX','Frequency']
    args = request.get_json()
    response = {}
    flag = False
    missed_field = []
   
    for field in fields:
        if field not in args:
            flag = True
            missed_field.append(field)
         
        response = {"message": f'Opps! seems you missed {missed_field} field(s)'}
        
    if not flag:
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
  
 
@app.route('/graph', methods=["GET"])
def generate_graph():
    scatter = scatter_plot()
    gaussian = guassian_plot()
    comparison = compare()
    
    return {"scatter": scatter, "gaussian": gaussian, "comparison": comparison}


@app.route('/report', methods=['GET'])
def generate_report():    
    return True





if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')