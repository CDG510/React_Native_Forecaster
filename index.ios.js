var React = require('react-native');
var {
    AppRegistry,
    MapView,
    View,
    StyleSheet,
    Text,
    View
} = React;

var Api = require('./src/api')

// c2af202ec0ae511e1dfc2f271529f969

var Weather = React.createClass({
    getInitialState: function(){
        return {
            pin: {
                latitude: 0,
                longitude: 0
            },
            city: "",
            temperature: "",
            description: ""
        };
    },
    render: function() {

        return <View style={styles.container}>
            <MapView
            annotations={[this.state.pin]}
            onRegionChangeComplete={this.onRegionChangeComplete}
            style={styles.map}>
            </MapView>
        <View style={styles.textWrapper}>
            <Text style={styles.text}>{this.state.city}</Text>
            <Text style={styles.text}>{this.state.temperature}</Text>
            <Text style={styles.text}>{this.state.description}</Text>
        </View>
        </View>
    },
    onRegionChangeComplete: function(region){
        this.setState({
            pin: {
                longitude: region.longitude,
                latitude: region.latitude
            }
        });
        Api(region.latitude, region.longitude)
            .then((data) =>{
                console.log(data)
                this.setState(data);
            });
    },
///setState adds to existing state

})

var styles = StyleSheet.create({
    map: {
        flex: 2,
        marginTop: 30
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: "stretch",
        backgroundColor: "#F5FCFF"
    },
    textWrapper: {
        flex: 1,
        alignItems: 'center',
    },
    text: {
        fontSize: 30
    }
})

AppRegistry.registerComponent('react_weather', () => Weather);
