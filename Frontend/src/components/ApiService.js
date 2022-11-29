const execute = 'http://127.0.0.1:5000/execute'
const graph = 'http://127.0.0.1:5000/graph'
const report = 'http://127.0.0.1:5000/report'

export default class APIService{
   
    static async Execute(body){
        const res = await fetch(execute, {
            'method': 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        return await res.json()
    }

    static async Graph(body){
        const res = await fetch(graph, {
            'method': 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        return await res.json()
    }

    static async Report(){
        const res = await fetch(report, {
            'method': 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return await res.json()
    }

}