const execute   =  'https://mw-optimizer.onrender.com/execute'
const graph     =  'https://mw-optimizer.onrender.com/graph'
const report    =  'https://mw-optimizer.onrender.com/report'

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