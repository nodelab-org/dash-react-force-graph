import dash
import dash_react_force_graph
from dash.dependencies import Input, Output
import dash_html_components as html

app = dash.Dash(__name__)

graphData = {
    nodes:[
        {"id":"person1"}#, "__label":"Daniella"},
        {"id":"person2",# "__label":"Ben"}
        {"id":"person3",# "__label":"Susan"}
        {"id":"person4",# "__label":"Susan"}
        {"id":"company1",# "__label":"Omnicorp Inc"}
        {"id":"ngo1", #"__supertype":"entity", "__label":"Omnicorp Inc", }
        {"id":"employment1", #"__supertype":"entity", "__label":"Omnicorp Inc", }
        {"id":"employment2", #"__supertype":"entity", "__label":"Omnicorp Inc", }
        {"id":"neighbours1", #"__supertype":"entity", "__label":"Omnicorp Inc", }
        ], 
    links:[
        {"source":"person1", "target":"employment1", "id":"link1", "__label":"employee"},
        {"source":"person2", "target":"employment1", "id":"link2", "__label":"employee"},
        {"source":"compan1", "target":"employment1", "id":"link3", "__label":"employer"},
        {"source":"person4", "target":"employmen2", "id":"link4", "__label":"employee"},
        {"source":"ngo1", "target":"employment2", "id":"link5", "__label":"employer"},
        {"source":"person2", "target":"neighbour1", "id":"link6", "__label":"neighbour"},
        {"source":"person4", "target":"neighbour1", "id":"link7", "__label":"neighbour"},
        ]
    }

app.layout = html.Div([
    dash_react_force_graph.Graph2D(
        id='graph2d',
        graphData=graphData
    ),
    dash_react_force_graph.Graph3D(
        id='graph3d',
        graphData=graphData
    ),
    html.Div(id='output')
])


@app.callback(Output('output', 'children'), [Input('input', 'value')])
def display_output(value):
    return 'You have entered {}'.format(value)


if __name__ == '__main__':
    app.run_server(debug=True)
