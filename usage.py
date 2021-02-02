import dash
import dash_react_force_graph
from dash.dependencies import Input, Output, State
from dash.exceptions import PreventUpdate
import dash_html_components as html
import random

app = dash.Dash(__name__,
    #prevent_initial_callbacks=True,
)

graphData = {
    "nodes":[
        {"id":"1",  "label":"Joe Benson", "color":"cornflowerblue", "icon":{"FontAwesome":"\uF007"}},
        {"id":"2", "label":"Daniella M", "color":"cornflowerblue", "icon":{"FontAwesome":"\uF007"}},
        {"id":"3",  "label":"Susan T", "color":"cornflowerblue", "icon":{"FontAwesome":"\uF007"}},
        {"id":"4",  "label":"Ed Smith", "color":"cornflowerblue", "icon":{"FontAwesome":"\uF007"}},
        {"id":"5",  "label":"Chevron", "color":"cornflowerblue", "img":"https://picsum.photos/200"},
        {"id":"6",  "label":"Frieds of the Earth", "color":"cornflowerblue", "img":"https://picsum.photos/200"},
        {"id":"7",  "label":"employment", "color":"tomato"},
        {"id":"8",  "label":"employment", "color":"tomato"}, 
        {"id":"9",  "label":"neighbours", "color":"tomato"}, 
        ], 
    "links":[
        {"id":"1", "label":"employee", "source":"1", "target":"7"},
        {"id":"2", "label":"employee", "source":"2", "target":"7"},
        {"id":"3", "label":"employer", "source":"5", "target":"7"},
        {"id":"4", "label":"employee", "source":"3", "target":"8"},
        {"id":"5", "label":"employer", "source":"4", "target":"8"},
        {"id":"6", "label":"employee", "source":"6", "target":"8"},
        {"id":"7", "label":"neighbour", "source":"2", "target":"9"},
        {"id":"7", "label":"neighbour", "source":"4", "target":"9"},
        ]#
    }

app.layout = html.Div([
    html.Br(),
    html.Button("reheat", id="button-reheat"),
    html.Button("add random node", id="button-add"),
    html.Button("delete random node", id="button-delete"),
    html.Br(),
    html.Br(),
    dash_react_force_graph.Graph2D(
        id='graph2D',
        graphData=graphData,
        heightRatio=0.45,
        nodeIcon_fontsheets= {"FontAwesome": "https://kit.fontawesome.com/a6e0eeba63.js"},
    ),
    html.Div(id='output-nodeHovered-2D'),
    html.Div(id='output-nodeClicked-2D'),
    html.Div(id='output-nodeRightClicked-2D'),
    html.Br(),
    html.Br(),
    dash_react_force_graph.Graph3D(
        id='graph3D',
        graphData=graphData,
        heightRatio=0.45,
        nodeIcon_fontsheets= {"FontAwesome": "https://kit.fontawesome.com/a6e0eeba63.js"},
    ),
    html.Div(id='output-nodeHovered-3D'),
    html.Div(id='output-nodeClicked-3D'),
    html.Div(id='output-nodeRightClicked-3D'),
])


@app.callback(
[
    Output('output-nodeHovered-2D', 'children'),
    Output('output-nodeClicked-2D',  'children'),
    Output('output-nodeRightClicked-2D',  'children'),
],
[
    Input('graph2D', 'nodeHovered'),
    Input('graph2D', 'nodeClicked'),
    Input('graph2D', 'nodeRightClicked'),
    Input('graph2D', 'nodesSelected'),
])

def display_selected_nodes_2D(nodeHovered, nodeClicked, nodeRightClicked, nodesSelected):
    return ["hovered node: {}".format(nodeHovered), "clicked node: {}".format(nodeClicked), "rightclicked node: {}".format(nodeRightClicked)]    

@app.callback(
    Output('graph2D', 'd3ReheatSimulation'), 
[
    Input('button-reheat', 'n_clicks')])
def reheat_graphData_2D(n_clicks):
    return True

@app.callback(Output('graph2D', 'graphData'), 
    [
        Input('button-add', 'n_clicks'),
        Input('button-delete', 'n_clicks')
    ],
    [
        State("graph2D","graphData")
    ])
def add_delete_random_node_2D(n_clicks_add, n_clicks_delete, graphData):
    ctx = dash.callback_context

    if not ctx.triggered:
        raise PreventUpdate
    else:
        trigger_id = ctx.triggered[0]["prop_id"].split(".")[0]

    if trigger_id == "button-add":
        newNodeId = max([int(node["id"]) for node in graphData["nodes"]])+1 if len(graphData["nodes"]) else 1
        newNode = {"id":newNodeId, "label":"new_node_".format(newNodeId), "color":"orange"}
        
        if len(graphData["nodes"]):
            ridx =  random.randrange(len(graphData["nodes"]))
            newLinkId = max([int(link["id"]) for link in graphData["links"]])+1 if len(graphData["links"]) else 1
            newLink = {"id":newLinkId, "source":newNode, "target": graphData["nodes"][ridx]["id"], "label":"new_link".format(newLinkId)}
            graphData["links"].append(newLink)

        graphData["nodes"].append(newNode)
    
    elif trigger_id == "button-delete":
        if not len(graphData["nodes"]):
            raise PreventUpdate

        ridx =  random.randrange(len(graphData["nodes"]))
        nodeDel = graphData["nodes"].pop(ridx)

        if len(graphData["links"]):
            graphData["links"] = list(filter(lambda link: not nodeDel["id"] in [link["source"]["id"], link["target"]["id"]], graphData["links"]))
        
    return graphData



if __name__ == '__main__':
    app.run_server(debug=True)
