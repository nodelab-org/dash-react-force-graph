import dash
import dash_core_components as dcc
import dash_react_force_graph
from dash.dependencies import Input, Output, State
from dash.exceptions import PreventUpdate
import dash_html_components as html
from dash_react_font_awesome_icon_picker import iconPicker
# import dash_core_components as dcc
import random
import json

app = dash.Dash(__name__
    #prevent_initial_callbacks=True,
)

def rm_graphData_render_data(graphData, graph_lib, coordinates_rm=[]):
    '''
    @usage remove the data inserted into graphData by react-force-graph components.
    @param graphData: graphData used by react-force-graph
    @param graph_lib: one of "2D", "2D" (not yet "AR", "VR")
    @param coordinates_rm: which coordinates to remove
    @return graphData, with data removed
    '''

    links_key = "edges" if graph_lib == "cytoscape" else "links"

    # do not remove indexColor?
    nodes_keys_rm = ["index", "vx","vy"]
    if graph_lib == "3D":
        nodes_keys_rm.append("vz")

    links_keys_rm = ["index","__controlPoints"]

    if graph_lib == "3D":
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
            print("")
            print('graphData[links_key][i]')
            print(graphData[links_key][i])
            # print(graphData[links_key][i]["source"])
            if type(graphData[links_key][i]["source"]) == dict:
                graphData[links_key][i]["source"] = graphData[links_key][i]["source"]["__nodeId"]
            if type(graphData[links_key][i]["target"]) == dict:
                graphData[links_key][i]["target"] = graphData[links_key][i]["target"]["__nodeId"]
    
    return graphData


# with open('/Users/rkm916/Documents/data_roles.json', 'r') as f:
#     graphData = json.load(f)

# print("")
# print("graphData")
# print(json.dumps(graphData,indent=3))
graphData = {
    "nodes":[
        {"__nodeId":"1",  "is_inferred":False, "name": "Joe Benson", "__nodeLabel":"Joe Benson", "__nodeColor":"cornflowerblue", "__nodeIcon":"\uF007", "__thingType":"person", "__rootType":"entity"},
        {"__nodeId":"2", "is_inferred":False,  "name": "Daniella M", "__nodeLabel":"Daniella M", "__nodeColor":"cornflowerblue", "__nodeIcon":"\uF007", "__thingType":"person", "__rootType":"entity"},
        {"__nodeId":"3", "is_inferred":False, "name": "Susan T", "__nodeLabel":"Susan T", "__nodeColor":"cornflowerblue", "__nodeIcon":"\uF007", "__thingType":"person", "__rootType":"entity"},
        {"__nodeId":"4", "is_inferred":False, "name": "Ed Smith",  "__nodeLabel":"Ed Smith", "__nodeColor":"cornflowerblue", "__nodeIcon":"\uF007", "__thingType":"person", "__rootType":"entity"},
        {"__nodeId":"5",  "is_inferred":False, "name": "Chevron", "__nodeLabel":"Chevron", "__nodeColor":"cornflowerblue", "__nodeImg":"https://picsum.photos/id/1024/200/200", "__thingType":"corporation", "__rootType":"entity"},
        {"__nodeId":"6",  "is_inferred":False, "name": "Friends of the Earth", "__nodeLabel":"Friends of the Earth", "__nodeColor":"cornflowerblue", "__nodeImg":"https://picsum.photos/id/10/200/300", "__thingType":"NGO", "__rootType":"entity"},
        {"__nodeId":"7",  "is_inferred":False, "name": "Strawberry Fields Ltd", "__nodeLabel":"Strawberry Fields Ltd", "__nodeColor":"cornflowerblue", "__nodeImg":"https://picsum.photos/id/11/200/300", "__thingType":"corporation", "__rootType":"entity"},
        {"__nodeId":"8",  "is_inferred":False, "name": "The Fundamentally Supine Authority", "__nodeLabel":"The Fundamentally Supine Authority", "__nodeColor":"cornflowerblue", "__nodeImg":"https://picsum.photos/id/16/200/300", "__thingType":"government", "__rootType":"entity"},
        {"__nodeId":"9",  "is_inferred":False, "__nodeLabel":"neighbours", "__nodeColor":"tomato", "__thingType":"neighbours", "__rootType":"relation"},
        {"__nodeId":"10", "is_inferred":False,  "__nodeLabel":"employment", "__nodeColor":"tomato", "__thingType":"employment", "__rootType":"relation"},
        {"__nodeId":"11", "is_inferred":False,  "__nodeLabel":"employment", "__nodeColor":"tomato", "__thingType":"employment", "__rootType":"relation"},
        {"__nodeId":"12", "is_inferred":True, "__nodeLabel":"employment", "__nodeColor":"tomato", "__thingType":"employment", "__rootType":"relation"},
        {"__nodeId":"13", "is_inferred":False,  "__nodeLabel":"neighbours", "__nodeColor":"tomato", "__thingType":"employment", "__rootType":"relation"},
        {"__nodeId":"14", "is_inferred":False,  "__nodeLabel":"employment", "__nodeColor":"tomato", "__thingType":"employment", "__rootType":"relation"},
        {"__nodeId":"15", "is_inferred":False,  "name": "Jenny Howard", "__nodeLabel":"Jenny Howard", "__nodeColor":"cornflowerblue", "__nodeIcon": "\uF007", "__thingType":"person", "__rootType":"entity"}

        ],
    "links":[
        {"id":"1", "label":"employee", "source":"1", "target":"10"},
        {"id":"2", "label":"employee", "source":"2", "target":"10"},
        {"id":"3", "label":"employer", "source":"5", "target":"10"},
        {"id":"4", "label":"employee", "source":"3", "target":"11"},
        {"id":"5", "label":"neighbour", "source":"4", "target":"13"},
        {"id":"6", "label":"employer", "source":"6", "target":"11"},
        {"id":"7", "label":"employer", "source":"8", "target":"12"},
        {"id":"8", "label":"neighbour", "source":"2", "target":"9"},
        {"id":"9", "label":"neighbour", "source":"4", "target":"9"},
        {"id":"10", "label":"neighbour", "source":"1", "target":"13"},
        {"id":"11", "label":"neighbour", "source":"3", "target":"13"},
        {"id":"12", "label":"employee", "source":"4", "target":"12"},
        {"id":"13", "label":"employer", "source":"7", "target":"14"},
        {"id":"14", "label":"employee", "source":"15", "target":"14"},
        {"id":"15", "label":"neighbour", "source":"15", "target":"9"},
        {"id":"16", "label":"neighbour", "source":"15", "target":"15"},
        ]#
    }

app.layout = html.Div([
    html.Br(),
    dcc.Dropdown(
        id="dropdown-type",
        placeholder="__thingType",
        options=[]
    ),
    iconPicker(
        id='iconPicker',
        value='FaCircle',
        hideSearch=False,
    ),
    dcc.Dropdown(
        placeholder ="invisible nodes",
        id="dropdown-nodeIdsInvisibleUser",
        options=[],
        multi=True
    ),
    dcc.Dropdown(
        placeholder="invisible links",
        id="dropdown-linkIdsInvisibleUser",
        options=[],
        multi=True
    ),
    html.Button("add random node", id="button-add"),
    html.Button("delete random node", id="button-delete"),
    
    dash_react_force_graph.Graph2D(
        id='graph2D',
        graphData=graphData,
        heightRatio=0.8,
        nodeId="__nodeId",
        nodeLabel="__nodeLabel",
        nodeColor="__nodeColor",
        nodeIcon="__nodeIcon",
        nodeImg="__nodeImg",
        nodeIcon_fontsheets=  "https://kit.fontawesome.com/a6e0eeba63.js"}
    ),
    html.Label("sortRelsBy1"),
    dcc.Dropdown(
        id="dropdown-sortRelsBy1",
        options=[
            {"label":"__nodeLabel", "value":"__nodeLabel"},
            {"label":"__nodeId", "value":"__nodeId"},
        ]),
    html.Label("sortRelsBy2"),
    dcc.Dropdown(
        id="dropdown-sortRelsBy2",
        options=[
            {"label":"__nodeLabel", "value":"__nodeLabel"},
            {"label":"__nodeId", "value":"__nodeId"},
        ]),
    html.Label("sortRoleplayersBy1"),
    dcc.Dropdown(
        id="dropdown-sortRoleplayersBy1",
        options=[
            {"label":"__nodeLabel", "value":"__nodeLabel"},
            {"label":"__nodeId", "value":"__nodeId"},
        ]),
    html.Label("sortRoleplayersBy2"),
    dcc.Dropdown(
        id="dropdown-sortRoleplayersBy2",
        options=[
            {"label":"__nodeLabel", "value":"__nodeLabel"},
            {"label":"__nodeId", "value":"__nodeId"},
        ]),
    html.Label("sortRels1Descend"),
    dcc.Dropdown(
        id="dropdown-sortRels1Descend",
        options=[
            {"label":"True", "value":"True"},
            {"label":"False", "value":"False"},
        ]),
    html.Label("sortRels2Descend"),
    dcc.Dropdown(
        id="dropdown-sortRels2Descend",
        options=[
            {"label":"True", "value":"True"},
            {"label":"False", "value":"False"},
        ]),
    html.Label("sortRoleplayers1Descend"),
    dcc.Dropdown(
        id="dropdown-sortRoleplayers1Descend",
        options=[
            {"label":"True", "value":"True"},
            {"label":"False", "value":"False"},
        ]),
    html.Label("sortRoleplayers2Descend"),
    dcc.Dropdown(
        id="dropdown-sortRoleplayers2Descend",
        options=[
            {"label":"True", "value":"True"},
            {"label":"False", "value":"False"},
        ]),
    html.Br(),
    html.Div(id='output-nodeClicked-2D'),
    html.Br(),
    html.Div(id='output-nodesSelected-2D'),
    html.Br(),
    html.Div(id='output-linksSelected-2D'),
    html.Br(),
    html.Div(id='output-nodeRightClicked-2D'),

])



# CALLBACKS 

@app.callback(
    [
        Output("dropdown-nodeIdsInvisibleUser","options"),
        Output("dropdown-linkIdsInvisibleUser","options")
    ],
    [
        Input("graph2D","graphData"),
    ]
)
def populate_dropdown_node_link_ids_invisible_user(graphdata):
    return [
        [{"label":node["__nodeId"], "value":node["__nodeId"]} for node in graphdata["nodes"]],
        [{"label":link["id"], "value":link["id"]} for link in graphdata["links"]]
    ]


@app.callback(
        Output("graph2D","nodeIdsInvisibleUser"),
    [
        Input("dropdown-nodeIdsInvisibleUser","value"),
    ],
)
def update_nodeidsinvisible_user(value):
    return [value] if not type(value) is list else value



@app.callback(
        Output("graph2D","linkIdsInvisibleUser"),
    [
        Input("dropdown-linkIdsInvisibleUser","value"),
    ],
)
def update_linkidsinvisible_user(value):
    return [value] if not type(value) is list else value


# sort
@app.callback(
    Output("graph2D","sortRelsBy1"),
    [Input("dropdown-sortRelsBy1","value")])
def sort_rels_by_1(attr):
    return attr

@app.callback(
    Output("graph2D","sortRelsBy2"),
    [Input("dropdown-sortRelsBy2","value")])
def sort_rels_by_2(attr):
    return attr

@app.callback(
    Output("graph2D","sortRels1Descend"),
    [Input("dropdown-sortRels1Descend","value")])
def sort_rels_1_desc(value):
    return bool(value)
    
@app.callback(
    Output("graph2D","sortRels2Descend"),
    [Input("dropdown-sortRels2Descend","value")])
def sort_rels_2_desc(value):
    return bool(value)

@app.callback(
    Output("graph2D","sortRoleplayersBy1"),
    [Input("dropdown-sortRoleplayersBy1","value")])
def sort_rps_by_1(attr):
    return attr

@app.callback(
    Output("graph2D","sortRoleplayersBy2"),
    [Input("dropdown-sortRoleplayersBy2","value")])
def sort_rps_by_2(attr):
    return attr

@app.callback(
    Output("graph2D","sortRoleplayers1Descend"),
    [Input("dropdown-sortRoleplayers1Descend","value")])
def sort_rps_1_desc(value):
    return bool(value)
    
@app.callback(
    Output("graph2D","sortRoleplayers2Descend"),
    [Input("dropdown-sortRoleplayers2Descend","value")])
def sort_rps_2_desc(value):
    return bool(value)


# add or delete notes

@app.callback(
[
    # Output('output-nodeHovered-2D', 'children'),
    Output('output-nodeClicked-2D',  'children'),
    Output('output-nodesSelected-2D',  'children'),
    Output('output-linksSelected-2D',  'children'),
    Output('output-nodeRightClicked-2D',  'children'),
],
[
    # Input('graph2D', 'nodeHovered'),
    Input('graph2D', 'nodeClicked'),
    Input('graph2D', 'nodesSelected'),
    Input('graph2D', 'linksSelected'),
    Input('graph2D', 'nodeRightClicked'),
])
def display_clicked_selected_nodes_2D(
    nodeClicked,
    nodesSelected,
    linksSelected,
    nodeRightClicked):
        return [
        "clicked node: {}".format(nodeClicked),
        "selected nodes: {}".format(nodesSelected),
        "selected links: {}".format(linksSelected),
        "rightclicked node: {}".format(nodeRightClicked),
        ]



@app.callback(
    Output("dropdown-type","options"),
    Input("graph2D","graphData")
)
def populate_dropdown_type(graphData):
    return [{"label":thingType, "value":thingType} for thingType in set([node["__thingType"] for node in graphData["nodes"]])]


@app.callback(Output('graph2D', 'graphData'),
    [
        Input('button-add', 'n_clicks'),
        Input('button-delete', 'n_clicks'),
        Input("iconPicker","value")
    ],
    [
        State("dropdown-type","value"),
        State("graph2D","graphData")
    ])
def update_graphdata(
    n_clicks_add, 
    n_clicks_delete, 
    icon, 
    thingType_selected,
    graphData
    ):
    ctx = dash.callback_context

    if not ctx.triggered:
        raise PreventUpdate
    else:
        trigger_id = ctx.triggered[0]["prop_id"].split(".")[0]

    print("")
    print("received graphData: {} ".format(graphData))

    graphData = rm_graphData_render_data(graphData, graph_lib="2D", coordinates_rm=[])

    if trigger_id == "button-add":
        newNodeId = max([int(node["__nodeId"]) for node in graphData["nodes"]])+1 if len(graphData["nodes"]) else 1
        newNode = {"__nodeId":newNodeId, "__nodeLabel":"new_node_{}".format(newNodeId), "__nodeColor":"orange", "__thingType":"TBC"}

        if len(graphData["nodes"]):
            ridx =  random.randrange(len(graphData["nodes"]))
            newLinkId = max([int(link["id"]) for link in graphData["links"]])+1 if len(graphData["links"]) else 1
            newLink = {"id":newLinkId, "source":newNode["__nodeId"], "target": graphData["nodes"][ridx]["__nodeId"], "label":"new_link_{}".format(newLinkId)}
            graphData["links"].append(newLink)

        graphData["nodes"].append(newNode)

    elif trigger_id == "button-delete":
        if not len(graphData["nodes"]):
            raise PreventUpdate

        ridx =  random.randrange(len(graphData["nodes"]))
        nodeDel = graphData["nodes"].pop(ridx)

        if len(graphData["links"]):
            graphData["links"] = list(filter(lambda link: not nodeDel["__nodeId"] in [link["source"], link["target"]], graphData["links"]))
    
    elif trigger_id == "iconPicker":
        # set icon
        for node in graphData["nodes"]:
            if node["__thingType"]==thingType_selected:
                pass

    print("")
    print("returning graphData: {} ".format(graphData))
    return graphData




if __name__ == '__main__':
    app.run_server(debug=True)
