(function() {
'use strict';

var radar = function() {

    var max = {
        'levels': 0,
        'kills': 0,
        'deaths': 0,
        'assists': 0,
        'gold': 0,
        'xp': 0,
        'lasthits': 0,
        'denies': 0,
    }
 
    var meanRadiant = {
            axes: [
                { axis: 'levels', value: 0, xOffset: 0, yOffset: -10 },
                { axis: 'kills', value: 0, xOffset: -10, yOffset: -10 },
                { axis: 'deaths', value: 0, xOffset: -25, yOffset: 10 },
                { axis: 'assists', value: 0, xOffset: -20, yOffset: 10 },
                { axis: 'lasthits', value: 0, xOffset: 0, yOffset: 10 },
                { axis: 'denies', value: 0, xOffset: 20, yOffset: 10 },
                { axis: 'gold', value: 0, xOffset: 15, yOffset: 10 },
                { axis: 'xp', value: 0, xOffset: 15, yOffset: -10 },
            ]
        },
        meanDire = {
            axes: [
                { axis: 'levels', value: 0, xOffset: 0, yOffset: -10,  },
                { axis: 'kills', value: 0, xOffset: -10, yOffset: -10 },
                { axis: 'deaths', value: 0, xOffset: -25, yOffset: 10 },
                { axis: 'assists', value: 0, xOffset: -20, yOffset: 10 },
                { axis: 'lasthits', value: 0, xOffset: 0, yOffset: 10 },
                { axis: 'denies', value: 0, xOffset: 20, yOffset: 10 },
                { axis: 'gold', value: 0, xOffset: 15, yOffset: 10 },
                { axis: 'xp', value: 0, xOffset: 15, yOffset: -10 },
            ]
        };
    
    d3.csv('data/' + files.roster)
        .row(function(d, i) {
            max = {
                'levels': 25,
                'kills': max['kills'] > +d['kills'] ? max['kills'] : +d['kills'],
                'deaths': max['deaths'] > +d['deaths'] ? max['deaths'] : +d['deaths'],
                'assists': max['assists'] > +d['assists'] ? max['assists'] : +d['assists'],
                'gold': max['gold'] > +d['gold'] ? max['gold'] : +d['gold'],
                'xp': max['xp'] > +d['xp'] ? max['xp'] : +d['xp'],
                'lasthits': max['lasthits'] > +d['lasthits'] ? max['lasthits'] : +d['lasthits'],
                'denies': max['denies'] > +d['denies'] ? max['denies'] : +d['denies'],
            };

            if(i <= 4) {
                meanRadiant.axes[0].value = ((+meanRadiant.axes[0].value*(i) + +d['levels'])/(i+1));
                meanRadiant.axes[1].value = ((+meanRadiant.axes[1].value*(i) + +d['kills'])/(i+1));
                meanRadiant.axes[2].value = ((+meanRadiant.axes[2].value*(i) + +d['deaths'])/(i+1));
                meanRadiant.axes[3].value = ((+meanRadiant.axes[3].value*(i) + +d['assists'])/(i+1));
                meanRadiant.axes[4].value = ((+meanRadiant.axes[4].value*(i) + +d['lasthits'])/(i+1));
                meanRadiant.axes[5].value = ((+meanRadiant.axes[5].value*(i) + +d['denies'])/(i+1));
                meanRadiant.axes[6].value = ((+meanRadiant.axes[6].value*(i) + +d['gold'])/(i+1));
                meanRadiant.axes[7].value = ((+meanRadiant.axes[7].value*(i) + +d['xp'])/(i+1));
            } else {          
                meanDire.axes[0].value = (+meanDire.axes[0].value*(i-5) + +d['levels'])/(i-4);
                meanDire.axes[1].value = (+meanDire.axes[1].value*(i-5) + +d['kills'])/(i-4);
                meanDire.axes[2].value = (+meanDire.axes[2].value*(i-5) + +d['deaths'])/(i-4);
                meanDire.axes[3].value = (+meanDire.axes[3].value*(i-5) + +d['assists'])/(i-4);
                meanDire.axes[4].value = (+meanDire.axes[4].value*(i-5) + +d['lasthits'])/(i-4);
                meanDire.axes[5].value = (+meanDire.axes[5].value*(i-5) + +d['denies'])/(i-4);
                meanDire.axes[6].value = (+meanDire.axes[6].value*(i-5) + +d['gold'])/(i-4);
                meanDire.axes[7].value = (+meanDire.axes[7].value*(i-5) + +d['xp'])/(i-4);
            }

            return {
                axes: [
                    { axis: 'levels', value: +d['levels'], xOffset: 0, yOffset: -10 },
                    { axis: 'kills', value: +d['kills'], xOffset: -10, yOffset: -10 },
                    { axis: 'deaths', value: +d['deaths'], xOffset: -25, yOffset: 10 },
                    { axis: 'assists', value: +d['assists'], xOffset: -20, yOffset: 10 },
                    { axis: 'lasthits', value: +d['lasthits'], xOffset: 0, yOffset: 10 },
                    { axis: 'denies', value: +d['denies'], xOffset: 20, yOffset: 10 },
                    { axis: 'gold', value: +d['gold'], xOffset: 15, yOffset: 10 },
                    { axis: 'xp', value: +d['xp'], xOffset: 15, yOffset: -10 },
                ]
            };
        })
        .get(function(err, rows) {            
            rows.unshift(meanDire);
            rows.unshift(meanRadiant);
            RadarChart.draw('#radar', rows.map(function(d, i) {
                return d.axes.map(function(a, b) {
                    return { axis: a.axis, value: a.value / (max[a.axis] / 10), xOffset: a.xOffset, yOffset: a.yOffset};
                });
            }), { //Setting up the config
                w: $('#radar').width(),
                h: $('#radar').height(),
                radius: 3, 
                levels: 5, 
                xOffset: 25, 
                yOffset: 25, 
                color: assign_player_color,
                maxValues: max,
            });

            rows.forEach(function(d,i) {
                if(i > 1)
                    $('.radar-chart-serie' + i).hide();
            })
            
        })

    this.update = function(players) {
        if (typeof players !== 'object') players = [players];

        selectPlayers(players);
    };

    /**
     * @param array $players
     * @return void
     */
    function selectPlayers(players) {
        $('.radar-chart polygon, .radar-chart circle').hide();

        if(players.length > 10)
                $('.radar-chart-serie0, .radar-chart-serie1').show();
        else {
            players.forEach(function(d) {
                if(players.length === 1)
                    d < 5 ? $('.radar-chart-serie0').show() : $('.radar-chart-serie1').show();

                $('.radar-chart-serie' + (+d+2)).show();
            });
        }
    }    
}   

// Bind to global space
window.radar = radar;

})();
