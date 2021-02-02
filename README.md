# dash-react-force-graph

dash-react-force-graph is a Dash component library built on (the very powerful) [react-force-graph](https://github.com/vasturiano/react-force-graph). 

It has many features in common with [Dash cytoscape](https://dash.plotly.com/cytoscape) and a few extra, such as 3D, Virtual Reality and Augmented Reality versions, as well as image nodes and backgrounds.  

See `usage.py` for a simple example and check out the original react component repo above for many others.

## Quick start (1 minute)
1. Install the library: `python -m pip install git+https://github.com/JonThom/dash-react-force-graph`, or, if using [pipenv](https://pipenv.pypa.io/en/latest/), `python -m pip install git+https://github.com/JonThom/dash-react-force-graph#egg=dash-react-force-graph`
2. Install Dash and its dependencies: https://dash.plotly.com/installation
3. For a simple example, download and run `usage.py`:
	1. `wget https://github.com/JonThom/dash-react-force-graph/blob/master/usage.py`
	2. `python usage.py`
4. Visit http://localhost:8050 in your web browser. Enjoy!

## Features

The Dash components expose many of the original React component props directly. Exceptions are:
* Props taking javascript functions, if available in the Dash component, are implemented differently (since Dash cannot serialize a javascript function). 
* Methods (such as `d3ReheatSimulation`) are, where possible, exposed as Dash props, either boolean or arrays of method arguments. Some methods, such as `.scene()` are currently not exposed in the Dash version.

Many function props (such as event handlers e.g. `onNodeClick`) which are available in the react component have been provided built-in functions that perform some sensible default behavior (such as clicking a node to select it). In this case, the Dash component exposes the clicked node and its coordinates as additional props.

See comments in the prop validation parts of the components in`./lib/components/` for detail.

## Status

The component is currently in an alpha-like stage. Fixes and updates will follow.

For now, only the 2D graph component is ported, the others will follow once the 2D version is stable.

Below: the standard README text from the Dash component boilerplate 

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md)

### Install dependencies

If you have selected install_dependencies during the prompt, you can skip this part.

1. Install npm packages
    ```
    $ npm install
    ```
2. Create a virtual env and activate.
    ```
    $ virtualenv venv
    $ . venv/bin/activate
    ```
    _Note: venv\Scripts\activate for windows_

3. Install python packages required to build components.
    ```
    $ pip install -r requirements.txt
    ```
4. Install the python packages for testing (optional)
    ```
    $ pip install -r tests/requirements.txt
    ```

### Write your component code in `src/lib/components/DashReactForceGraph.react.js`.

- The demo app is in `src/demo` and you will import your example component code into your demo app.
- Test your code in a Python environment:
    1. Build your code
        ```
        $ npm run build
        ```
    2. Run and modify the `usage.py` sample dash app:
        ```
        $ python usage.py
        ```
- Write tests for your component.
    - A sample test is available in `tests/test_usage.py`, it will load `usage.py` and you can then automate interactions with selenium.
    - Run the tests with `$ pytest tests`.
    - The Dash team uses these types of integration tests extensively. Browse the Dash component code on GitHub for more examples of testing (e.g. https://github.com/plotly/dash-core-components)
- Add custom styles to your component by putting your custom CSS files into your distribution folder (`dash_react_force_graph`).
    - Make sure that they are referenced in `MANIFEST.in` so that they get properly included when you're ready to publish your component.
    - Make sure the stylesheets are added to the `_css_dist` dict in `dash_react_force_graph/__init__.py` so dash will serve them automatically when the component suite is requested.
- [Review your code](./review_checklist.md)

### Create a production build and publish:

1. Build your code:
    ```
    $ npm run build
    ```
2. Create a Python distribution
    ```
    $ python setup.py sdist bdist_wheel
    ```
    This will create source and wheel distribution in the generated the `dist/` folder.
    See [PyPA](https://packaging.python.org/guides/distributing-packages-using-setuptools/#packaging-your-project)
    for more information.

3. Test your tarball by copying it into a new environment and installing it locally:
    ```
    $ pip install dash_react_force_graph-0.0.1.tar.gz
    ```

4. If it works, then you can publish the component to NPM and PyPI:
    1. Publish on PyPI
        ```
        $ twine upload dist/*
        ```
    2. Cleanup the dist folder (optional)
        ```
        $ rm -rf dist
        ```
    3. Publish on NPM (Optional if chosen False in `publish_on_npm`)
        ```
        $ npm publish
        ```
        _Publishing your component to NPM will make the JavaScript bundles available on the unpkg CDN. By default, Dash serves the component library's CSS and JS locally, but if you choose to publish the package to NPM you can set `serve_locally` to `False` and you may see faster load times._

5. Share your component with the community! https://community.plotly.com/c/dash
    1. Publish this repository to GitHub
    2. Tag your GitHub repository with the plotly-dash tag so that it appears here: https://github.com/topics/plotly-dash
    3. Create a post in the Dash community forum: https://community.plotly.com/c/dash
