import dash
import dash_core_components as dcc
import dash_react_force_graph
from dash.dependencies import Input, Output, State
from dash.exceptions import PreventUpdate
import dash_html_components as html
# import dash_core_components as dcc
import random

app = dash.Dash(__name__,
    #prevent_initial_callbacks=True,
)


def rm_graphData_render_data(graphData, graph_lib, coordinates_rm=["x","y","z"]):
    '''
    @usage remove the data inserted into graphData by react-force-graph components.
    @param graphData: graphData used by react-force-graph
    @param graph_lib: one of "2D", "2D" (not yet "AR", "VR")
    @param coordinates_rm: which coordinates to remove
    @return graphData, with data removed
    '''

    links_key = "edges" if graph_lib == "cytoscape" else "links"

    # do not remove indexColor?
    nodes_keys_rm = ["index", "vx","vy", "vz"]
    if graph_lib == "2D":
        nodes_keys_rm.append("vz")

    links_keys_rm = ["index","__controlPoints"]

    if graph_lib == "2D":
        nodes_keys_rm.append("__threeObj")
        links_keys_rm += ["__arrowObj",   "__curve", "__lineObj"]

    nodes_keys_rm += coordinates_rm

    if len(nodes_keys_rm) > 0:
        for i in range(len(graphData["nodes"])):
            for each_key in nodes_keys_rm:
                if each_key in graphData["nodes"][i].keys():
                    graphData["nodes"][i].pop(each_key)
    # links
    if len(links_keys_rm) > 0:
        for i in range(len(graphData[links_key])):
            for each_key in links_keys_rm:
                if each_key in graphData[links_key][i].keys():
                    graphData[links_key][i].pop(each_key)

    # reactforcegraph substitutes the whole node object for the id upon render; reverse this for consistency
    if len(graphData[links_key])>0:
        for i in range(len(graphData[links_key])):
            if not (type(graphData[links_key][i]["source"])) is str:
                graphData[links_key][i]["source"] = graphData[links_key][i]["source"]["nodeId"]
            if not (type(graphData[links_key][i]["target"])) is str:
                graphData[links_key][i]["target"] = graphData[links_key][i]["target"]["nodeId"]

    return graphData




graphData = {
    "nodes":[
        {"nodeId":"1",  "__nodeLabel":"Joe Benson", "__nodeColor":"cornflowerblue", "__nodeIcon":{"FontAwesome":"\uF007"}},
        {"nodeId":"2", "__nodeLabel":"Daniella M", "__nodeColor":"cornflowerblue", "__nodeIcon":{"FontAwesome":"\uF007"}},
        {"nodeId":"3",  "__nodeLabel":"Susan T", "__nodeColor":"cornflowerblue", "__nodeIcon":{"FontAwesome":"\uF007"}},
        {"nodeId":"4",  "__nodeLabel":"Ed Smith", "__nodeColor":"cornflowerblue", "__nodeIcon":{"FontAwesome":"\uF007"}},
        {"nodeId":"5",  "__nodeLabel":"Chevron", "__nodeColor":"cornflowerblue", "__nodeImg":"https://picsum.photos/id/1024/200/200"},
        {"nodeId":"6",  "__nodeLabel":"Friends of the Earth", "__nodeColor":"cornflowerblue", "__nodeImg":"https://picsum.photos/id/10/200/300"},
        {"nodeId":"7",  "__nodeLabel":"Strawberry Fields Ltd", "__nodeColor":"cornflowerblue", "__nodeImg":"https://picsum.photos/id/11/200/300"},
        {"nodeId":"8",  "__nodeLabel":"The Fundamentally Supine Authority", "__nodeColor":"cornflowerblue", "__nodeImg":"https://picsum.photos/id/16/200/300"},
        {"nodeId":"9",  "__nodeLabel":"neighbours", "__nodeColor":"tomato"},
        {"nodeId":"10",  "__nodeLabel":"employment", "__nodeColor":"tomato"},
        {"nodeId":"11",  "__nodeLabel":"employment", "__nodeColor":"tomato"},
        {"nodeId":"12",  "__nodeLabel":"employment", "__nodeColor":"tomato"},
        {"nodeId":"13",  "__nodeLabel":"neighbours", "__nodeColor":"tomato"},
        {"nodeId":"14",  "__nodeLabel":"employment", "__nodeColor":"tomato"},
        {"nodeId":"15",  "__nodeLabel":"Jenny Howard", "__nodeColor":"cornfloweblue", "__nodeIcon": {"FontAwesome":"\uF007"}}
    
        ],
    "links":[
        {"id":"1", "label":"employee", "source":"1", "target":"10"},
        {"id":"2", "label":"employee", "source":"2", "target":"10"},
        {"id":"3", "label":"employer", "source":"5", "target":"10"},
        {"id":"4", "label":"employee", "source":"3", "target":"11"},
        {"id":"5", "label":"neighbour", "source":"4", "target":"13"},
        {"id":"6", "label":"employer", "source":"6", "target":"11"},
        # {"id":"7", "label":"employer", "source":"7", "target":"10"},
        {"id":"8", "label":"employer", "source":"8", "target":"12"},
        {"id":"10", "label":"neighbour", "source":"2", "target":"9"},
        {"id":"11", "label":"neighbour", "source":"4", "target":"9"},
        {"id":"12", "label":"neighbour", "source":"1", "target":"13"},
        {"id":"13", "label":"neighbour", "source":"3", "target":"13"},
        {"id":"14", "label":"employee", "source":"4", "target":"12"},
        {"id":"15", "label":"employer", "source":"7", "target":"14"},
        {"id":"16", "label":"employee", "source":"15", "target":"14"},
        {"id":"17", "label":"neighbour", "source":"15", "target":"9"},
        ]#
    }

app.layout = html.Div([
    html.Br(),
    html.Button("add random node", id="button-add"),
    html.Button("delete random node", id="button-delete"),
    dcc.Dropdown(
        id="dropdown",
        options=[
            {"label":"1","value":"1"},
            {"label":"2","value":"2"},
            {"label":"3","value":"3"},
            {"label":"4","value":"4"},
            {"label":"5","value":"5"},
            {"label":"6","value":"6"},
            {"label":"7","value":"7"},
            {"label":"8","value":"8"},
            {"label":"9","value":"9"},
            {"label":"None","value":"None"},
        ]),

    dash_react_force_graph.Graph2D(
        id='graph2D',
        graphData=graphData,
        heightRatio=0.8,
        nodeId="nodeId",
        nodeLabel="__nodeLabel",
        nodeColor="__nodeColor",
        nodeIcon="__nodeIcon",
        nodeImg="__nodeImg",
        nodeIcon_fontsheets= {"FontAwesome": "https://kit.fontawesome.com/a6e0eeba63.js"},
        dagModeOn=False,
        dagMode=None,
        dagNodeIds=["3","4","6","8","9"]
    ),
    # dash_react_force_graph.Graph2D(
    #     id='graph2D',
    #     graphData=graphData,
    #     heightRatio=0.45,
    #     nodeId="nodeId",
    #     nodeLabel="__nodeLabel",
    #     nodeColor="__nodeColor",
    #     nodeIcon="__nodeIcon",
    #     nodeImg="__nodeImg",
    #     nodeIcon_fontsheets= {"FontAwesome": "https://kit.fontawesome.com/a6e0eeba63.js"},
    # ),
    # html.Div(id='output-nodeHovered-2D'),
    html.Div(id='output-nodeClicked-2D'),
    html.Div(id='output-nodeRightClicked-2D'),
    # html.H2("Graph2D"),
    # html.Div(id='output-nodeClicked-2D'),
    # html.Div(id='output-nodeRightClicked-2D'),
    html.Br(),
    # html.Br(),
    # dash_react_force_graph.Graph2D(
    #     id='graph2D',
    #     graphData=graphData,
    #     heightRatio=0.45,
    #     nodeIcon_fontsheets= {"FontAwesome": "https://kit.fontawesome.com/a6e0eeba63.js"},
    # ),
    # html.Div(id='output-nodeHovered-2D'),
    # html.Div(id='output-nodeClicked-2D'),
    # html.Div(id='output-nodeRightClicked-2D'),
])


@app.callback(
    Output('dropdown',  'options'),
[
    Input('graph2D', 'graphData'),
])
def populate_node_dropdown(graphData):
    return [{"label":node["nodeId"], "value":node["nodeId"]} for node in graphData["nodes"]]


@app.callback(Output('graph2D',  'nodeZoomId'),
[
    Input('dropdown', 'value'),
])
def zoom_to_node(nodeZoomId):
    ctx = dash.callback_context

    if not ctx.triggered:
        raise PreventUpdate

    if nodeZoomId == "None":
        nodeZoomId = None

    return nodeZoomId


@app.callback(
[
    # Output('output-nodeHovered-2D', 'children'),
    Output('output-nodeClicked-2D',  'children'),
    Output('output-nodeRightClicked-2D',  'children'),
],
[
    # Input('graph2D', 'nodeHovered'),
    Input('graph2D', 'nodeClicked'),
    Input('graph2D', 'nodeRightClicked'),
])
def display_selected_nodes_2D( nodeClicked, nodeRightClicked):
    
    return ["clicked node: {}".format(nodeClicked), "rightclicked node: {}".format(nodeRightClicked)]



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

    graphData = rm_graphData_render_data(graphData, graph_lib="2D", coordinates_rm=[])

    if trigger_id == "button-add":
        newNodeId = max([int(node["nodeId"]) for node in graphData["nodes"]])+1 if len(graphData["nodes"]) else 1
        newNode = {"nodeId":newNodeId, "__nodeLabel":"new_node_".format(newNodeId), "__nodeColor":"orange"}

        if len(graphData["nodes"]):
            ridx =  random.randrange(len(graphData["nodes"]))
            newLinkId = max([int(link["id"]) for link in graphData["links"]])+1 if len(graphData["links"]) else 1
            newLink = {"id":newLinkId, "source":newNode["nodeId"], "target": graphData["nodes"][ridx]["nodeId"], "label":"new_link".format(newLinkId)}
            graphData["links"].append(newLink)

        graphData["nodes"].append(newNode)

    elif trigger_id == "button-delete":
        if not len(graphData["nodes"]):
            raise PreventUpdate

        ridx =  random.randrange(len(graphData["nodes"]))
        nodeDel = graphData["nodes"].pop(ridx)

        if len(graphData["links"]):
            graphData["links"] = list(filter(lambda link: not nodeDel["nodeId"] in [link["source"], link["target"]], graphData["links"]))

    return graphData




# @app.callback(
# [
#     # Output('output-nodeHovered-2D', 'children'),
#     Output('output-nodeClicked-2D',  'children'),
#     Output('output-nodeRightClicked-2D',  'children'),
# ],
# [
#     # Input('graph2D', 'nodeHovered'),
#     Input('graph2D', 'nodeClicked'),
#     Input('graph2D', 'nodeRightClicked'),
# ])
# def display_selected_nodes_2D( nodeClicked, nodeRightClicked):
#     return ["clicked node: {}".format(nodeClicked), "rightclicked node: {}".format(nodeRightClicked)]

# @app.callback(
#     Output('graph2D', 'd3ReheatSimulation'),
# [
#     Input('button-reheat', 'n_clicks')])
# def reheat_graphData_2D(n_clicks):
#     return True

# @app.callback(
#     Output('graph2D', 'd3Force_call'),
# [
#     Input('slider-d3Force-charge-strength', 'value')])
# def update_d3Force_charge_strength(slidervalue):
#     return {"name":"charge", "method":"strength", "method_args":[slidervalue]}

# @app.callback(Output('graph2D', 'graphData'),
#     [
#         Input('button-add', 'n_clicks'),
#         Input('button-delete', 'n_clicks')
#     ],
#     [
#         State("graph2D","graphData")
#     ])
# def add_delete_random_node_2D(n_clicks_add, n_clicks_delete, graphData):
#     ctx = dash.callback_context

#     if not ctx.triggered:
#         raise PreventUpdate
#     else:
#         trigger_id = ctx.triggered[0]["prop_id"].split(".")[0]

#     graphData = rm_graphData_render_data(graphData, graph_lib="2D", coordinates_rm=[])

#     if trigger_id == "button-add":
#         newNodeId = max([int(node["nodeId"]) for node in graphData["nodes"]])+1 if len(graphData["nodes"]) else 1
#         newNode = {"nodeId":newNodeId, "__nodeLabel":"new_node_".format(newNodeId), "__nodeColor":"orange"}

#         if len(graphData["nodes"]):
#             ridx =  random.randrange(len(graphData["nodes"]))
#             newLinkId = max([int(link["id"]) for link in graphData["links"]])+1 if len(graphData["links"]) else 1
#             newLink = {"id":newLinkId, "source":newNode["nodeId"], "target": graphData["nodes"][ridx]["nodeId"], "label":"new_link".format(newLinkId)}
#             graphData["links"].append(newLink)

#         graphData["nodes"].append(newNode)

#     elif trigger_id == "button-delete":
#         if not len(graphData["nodes"]):
#             raise PreventUpdate

#         ridx =  random.randrange(len(graphData["nodes"]))
#         nodeDel = graphData["nodes"].pop(ridx)

#         if len(graphData["links"]):
#             graphData["links"] = list(filter(lambda link: not nodeDel["nodeId"] in [link["source"], link["target"]], graphData["links"]))

#     return graphData


if __name__ == '__main__':
    app.run_server(debug=True)
