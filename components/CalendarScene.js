import React, { Component, PropTypes } from 'react';
import { Image, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import Header from './Header';
import MyAppText from './MyAppText';
import { getEvents, getClub } from '../utils/api';

export default class CalendarScene extends Component {
    static propTypes = {
        onBack: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props);
        this.state = { championnat: '', date: '', team1: '', team2: '', score: '', clubName: '' };
     }

    componentDidMount() {
        console.log(this.props.club_id);
        let responseJson = getEvents(this.props.club_id)
            .then((responseJson) => {
                console.log('res in cal', responseJson);
                this.setState({ 
                    championnat: responseJson.championnat, 
                    date: responseJson.date, 
                    team1: responseJson.team1, 
                    team2: responseJson.team2, 
                    score: responseJson.score 
                })
            }).catch((err) => {
                console.log(err);
            });

        responseJson = getClub(this.props.club_id)
        .then((responseJson) => { 
            this.setState({ 
            clubName: responseJson.name, 
            });
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <Header/>
                <TouchableHighlight onPress={() => this.props.onBack(11623)}>
                    <View style={styles.returnBar}>
                        <Image source={require('../assets/ic_chevron_l.png')} style={styles.chevron}></Image>
                        <MyAppText style={styles.returnBarText}>Retour à {this.state.clubName}</MyAppText>
                    </View>
                </TouchableHighlight>
                <Image source={require('../assets/img_club.png')} style={styles.backImg}>
                    <MyAppText style={styles.teamName}>{this.state.championnat}</MyAppText>
                    <TouchableHighlight style={styles.followBtn}>
                        <MyAppText style={styles.followTxt}>Suivre</MyAppText>
                    </TouchableHighlight>
                    <View style={styles.navBar}>
                        <TouchableHighlight style={styles.navBarElement, styles.activeTabElement}>
                            <MyAppText style={styles.navBarText, styles.activeTabText}>Calendrier</MyAppText>
                        </TouchableHighlight>
                        <TouchableHighlight style={styles.navBarElement}>
                            <MyAppText style={styles.navBarText}>Classement</MyAppText>
                        </TouchableHighlight>
                        <TouchableHighlight style={styles.navBarElement}>
                            <MyAppText style={styles.navBarText}>Joueurs</MyAppText>
                        </TouchableHighlight>
                    </View>
                </Image>
                <MyAppText style={styles.nextGamesTitle}>PROCHAINS MATCHS</MyAppText>
                <View style={styles.nextGame}>
                    <View style={styles.nextGameHeader}>
                        <Image source={require('../assets/ic_team_own.png')} style={styles.logoOwn}></Image>
                        <Text style={styles.score}>-</Text>
                        <Image source={require('../assets/ic_team_ext.png')} style={styles.logoExt}></Image>
                    </View>
                    <View style={styles.date}>
                        <Text style={styles.grey}>Le {this.state.date}</Text>
                        <Text style={styles.grey}>Contre <Text style={styles.orange}>{this.state.team1}</Text></Text> 
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    grey: {
        color: "#909090",
    },
    orange: {
        color: "#EC4832",
    },
    date: {
        padding: 10,
    },
    score: {
        color: "orange",
        fontWeight: "bold",
        marginTop: 5,
    },
    logoOwn: {
        height: 33,
        width: 30,
    },
    logoExt: {
        height: 33,
        width: 30,
    },
    nextGameHeader: {
        paddingTop: 10,
        height: 53,
        backgroundColor: "rgba(50,65,75,0.1)",
        flexDirection: "row",
        justifyContent: "space-around",
    },
    nextGame: {
        alignSelf: "center",
        backgroundColor: "white",
        width: 355,
        height: 120,
        borderRadius: 5,
        shadowColor: "#C4C4C4",
        shadowOffset: {height: 2, width: 0},
        shadowOpacity: 0.8,
        shadowRadius: 1,
    },
    container: {
        backgroundColor: "#FAFAFA",
        flex: 1,
    },
    returnBar: {
        flexDirection: "row",
        backgroundColor: "#3c414b",
        height: 40
    },
    chevron: {
        marginLeft: 12,
        height: 10,
        width: 10,
        alignSelf: "center"
    },
    returnBarText: {
        color: "white",
        marginLeft: 20,
        alignSelf: "center"
    },
    teamName: {
        color: "white",
        fontSize: 15,
        marginLeft: 10,
        marginTop: 30,
        backgroundColor: "rgba(0,0,0,0)",
        justifyContent: "center"
    },
    followTxt: {
        color: "white",
        textAlign: "center"
    },
    backImg: {
        height: 120,
        alignSelf: "center",
        resizeMode: "cover",
        justifyContent: "flex-end",
        width: 375,
    },
    navBar: {
        flexDirection: "row",
        justifyContent: "space-around",
        backgroundColor: "#1A2735",
        height: 40,
    },
    followBtn: {
        width: 60,
        borderRadius: 3,
        borderWidth: 1,
        padding: 5,
        alignItems: "center",
        borderColor: "white",
        alignSelf: "flex-end",
        marginBottom: 10,
        marginRight: 10,
    },
    navBarText: {
        color: "#777",
        paddingLeft: 20,
        paddingRight: 20
    },
    navBarElement: {
        alignSelf: "center",
    },
    activeTabElement: {
        paddingTop: 12,
        borderBottomWidth: 2,
        borderBottomColor: "#e53320",
    },
    activeTabText: {
        color: "white"
    },
    nextGamesTitle: {
        margin: 10,
        color: "#777"
    }
});