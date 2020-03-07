import React, {useEffect} from 'react';
import './App.css';

/*
Here you can see the quirkiest importing mechanism ever.

First, we import the NodeJS Blockly module
Then, we expose Blockly as a global variable so that the other Ffau files can access it.
Of course, we need to use @ts-ignore because global variables are illegal
Then, we set the Blockly hue/saturation to be boosted, just like on the CodeDragon website

Then, we use runtime imports (rather than webpack imports) to run the rest of the Ffau functions so everything is defined
These are synchronous, so by the time we get to initialising the editor, all these will have finished loading
 */
import Blockly from "blockly";
// @ts-ignore
global.Blockly = Blockly;
Blockly.HSV_SATURATION = 1;
Blockly.HSV_VALUE = 0.7;

require('@codeddraig/ffau-editor/library/ffau/blocks');
require('@codeddraig/ffau-editor/library/ffau/generator');
require('@codeddraig/ffau-editor/dist/ffau.css');

// the root container
function App() {
    /*
    useEffect(() => {}, []) is the equivalent of componentDidMount

    you can also implement a componentWillUnmount by returning a cancellation function:
    useEffect(() => {
        // mount code
        return () => {
            // unmount code
        };
    }, []);

    Hooks are faster than classes, which is why we use them. See https://reactjs.org/docs/hooks-reference.html for more info
    */
    useEffect(() => {
        /*
        we're safe to arbitrarily refer to the id #blockly-injection here
        this is because we'll always run a render before the first effects are called
        */
        Blockly.inject('blockly-injection', {
            // #toolbox is safe because React code runs after the DOM has initialised (see public/index.html)
            // add || undefined because Blockly has some sketchy TS definitions
            toolbox: document.getElementById('toolbox') || undefined
        });
    }, []);

    return (
        <div style={{ width: '100vw', height: '100vh', display: 'flex' }}>
            <div id='blockly-injection' style={{
                flex: 1
            }} />
        </div>
    );
}

export default App;
