(function() {
'use strict';

var proximity = function(files) {

    var self = this;

    var $div = $('.proximity');

    var width = $div.width(),
        height = $div.height();

    var margin = { x: 0, y: 20 };

    var x = d3.scale.linear()
            .range([margin.x, width-margin.x]),

        y = d3.scale.linear()
            .range([height-margin.y, margin.y]);

    var axis_x = d3.svg.axis()
        .scale(x)
        .tickFormat(function(d) {
            return format_time(d);
        })
        .orient('bottom');

    var line = d3.svg.line()
        .interpolate('basic')
        .x(function(d, i) { return x(i); })
        .y(function(d) { return y(d); });

    var ramp = d3.scale.linear()
        .range(['blue', 'yellow', 'red']);

    var svg = d3.select('.proximity')
        .append('svg:svg')
        .attr('width', width)
        .attr('height', height);

    var time_scale = d3.scale.linear().range([0, width]);

    this.brush = d3.svg.brush()
        .x(time_scale)
        .on('brushstart', brushed_start)
        .on('brush',  brushed);

    var tt = d3.select('body')
        .append('div')
        .attr('class', 'tooltip');

    d3.csv('data/' + files.position)
        .row(function(row) {
            // Team centroids
            var team_centroids = d3.values([0, 5]).map(function(team) {
                var centroid = d3.range(team, team + 5).reduce(function(prev, current, index) {
                    return {
                        x: prev.x + +row['Hero' + current + 'Posx'],
                        y: prev.y + +row['Hero' + current + 'Posy']
                    };
                }, {x: 0, y: 0});

                centroid = { x: centroid.x / 5, y: centroid.y / 5 };

                return centroid;
            });

            // Find distance for all players to its team centroid
            var teammates_distance = d3.range(0, 10).map(function(index) {
                var tc = team_centroids[index < 5 ? 0 : 1];
                return Math.sqrt(
                    Math.pow(tc.x - +row['Hero' + index + 'Posx'], 2) +
                    Math.pow(tc.y - +row['Hero' + index + 'Posy'], 2)
                );
            });

            var farthest_player_distance_by_team = {
                0: 0,
                5: 0
            };

            var farthest_player_by_team = {
                0: -1,
                5: -1,
            };

            // Find the player farthest from its team centroid
            d3.range(0, 10).forEach(function(index) {
                var team = index < 5 ? 0 : 5,
                    tc = team_centroids[index < 5 ? 0 : 1];

                if (teammates_distance[index] > farthest_player_distance_by_team[team]) {
                    farthest_player_by_team[team] =  index;
                    farthest_player_distance_by_team[team] = teammates_distance[index];
                }
            });

            // Calculate new centroid -- skipping the outlier
            team_centroids = d3.values([0, 5]).map(function(team) {
                var centroid = d3.range(team, team + 5).reduce(function(prev, current, index) {
                    if (current === farthest_player_by_team[team]) return prev;

                    return {
                        x: prev.x + +row['Hero' + current + 'Posx'],
                        y: prev.y + +row['Hero' + current + 'Posy']
                    };
                }, {x: 0, y: 0});

                centroid = { x: centroid.x / 5, y: centroid.y / 5 };

                return centroid;
            });

            // Team accumulative proximity -- skipping the outlier
            var players_proximity = d3.values([0, 5]).map(function(team, index) {
                return d3.range(team, team + 5).reduce(function(prev, current) {
                    if (current === farthest_player_by_team[team]) return prev;

                    return prev + Math.sqrt(
                        Math.pow(+row['Hero' + current + 'Posx'] - team_centroids[index].x, 2) +
                        Math.pow(+row['Hero' + current + 'Posy'] - team_centroids[index].y, 2)
                    );
                }, 0);
            });

            return {
                time: +row['Time'],
                centroids: team_centroids,
                radiant: players_proximity[0],
                dire: players_proximity[1],
            };
        })
        .get(function(err, rows) {
            self.data = rows;

            // Color
            ramp.domain([0, self.data.length/2, self.data.length]);

            // Time scale
            time_scale.domain(d3.extent(rows, function(d) { return d.time; }));

            x.domain([0, self.data.length]);
            y.domain([0, d3.max(self.data, function(d) {
                return d.radiant > d.dire ? d.radiant : d.dire;
            })]);

            self.team_data = {};
            d3.values(['dire', 'radiant']).forEach(function(team) {
                self.team_data[team] = self.data.map(function(d, i) {
                    return d[team];
                });
            });

            draw();

            // Debug draw the centroids
            /*
            map.draw_centroids(self.data.map(function(d) {
                return d.centroids[0];
            }));
            */
        });

    function draw() {
        svg.append('g')
            .datum(self.team_data.radiant)
            .append('path')
            .style('stroke', team_color('radiant'))
            .style('fill', 'none')
            .attr('stroke-width', 2)
            .attr('d', line);

        svg.append('g')
            .datum(self.team_data.dire)
            .append('path')
            .style('stroke', team_color('dire'))
            .style('fill', 'none')
            .attr('stroke-width', 2)
            .attr('d', line);

        /*
        svg.append('g')
            .style('transform', 'translate(0, ' + (height-margin.y) + 'px)')
            .call(axis_x);
            */

        svg.append('g')
            .append('text')
            .text('team spread out')
            .attr('class', 'time')
            .style('transform', 'translate(' + margin.x + 'px, ' + margin.y + 'px)');

        svg.append('g')
            .append('text')
            .text('team clumped together')
            .attr('class', 'time')
            .style('transform', 'translate(' + margin.x + 'px, ' + (height - margin.y - 5) + 'px)');

        // Legend
        draw_legend(10, 120);

        /*
        svg.append('g')
            .style('transform', 'translate(' + margin.x + 'px, 0)')
            .call(axis_y);
            */

        svg.append('g')
            .attr('class', 'brush-proximity')
            .call(self.brush)
            .selectAll('rect')
            .attr('height', height)
            .on('mousemove', function() {
                if (self.brush.empty()) {
                    var offset = $(d3.event.target).closest('svg').offset().top;

                    var time = format_time(time_scale.invert(d3.event.offsetX));

                    tt.transition()
                        .style('opacity', 0.9)
                        .style('left', d3.event.pageX + 'px')
                        //.style('top', (offset + height/2 - 20) + 'px');
                        .style('top', (offset - 20) + 'px');
                    tt.html('<strong>' + time + '</strong><br>');
                }
            })
            .on('mouseout', function() {
                tt.transition()
                    .style('opacity', 0)
            });
    }

    function draw_legend(x, y) {
        var stroke = 4;
            width = 30,
            margin = 20;

        svg.append('g')
            .append('path')
            .style('stroke', team_color('radiant'))
            .style('fill', 'none')
            .attr('stroke-width', stroke)
            .attr('d', 'M' + x + ',' + y + 'L' + (x+width) + ',' + y);

        svg.append('g')
            .append('path')
            .style('stroke', team_color('dire'))
            .style('fill', 'none')
            .attr('stroke-width', stroke)
            .attr('d', 'M' + x + ',' + (y+margin) + 'L' + (x+width) + ',' + (y+margin));

        svg.append('g')
            .append('text')
            .text('radiant')
            .attr('class', 'time')
            .style('transform', 'translate(' + (x+width+stroke) + 'px, ' + (y+stroke/2) + 'px)');

        svg.append('g')
            .append('text')
            .text('dire')
            .attr('class', 'time')
            .style('transform', 'translate(' + (x+width+stroke) + 'px, ' + (y+margin+stroke/2) + 'px)');
    }

    function brushed_start() {
        svg.selectAll('.foreground circle')
            .classed('brush-selected', false);

        svg.selectAll('.centroids circle')
            .classed('brush-selected', false);
    }

    function brushed() {
        var s = self.brush.extent();

        if (!self.brush.empty()) {
            svg.selectAll('.foreground circle')
                .classed('brush-selected', function(d, i) {
                    console.log(d);
                    return !(s[0] < d.time && d.time < s[1]);
                });

            svg.selectAll('.centroids circle')
                .classed('brush-selected', function(d, i) {
                    // TODO: FIX TIMESCALE
                    return !(s[0] < 1.7*i && 1.7*i < s[1]);
                });
        } else {
            brushed_start();
        }

        // Dispatch
        map.update_brush(s);
    }

    this.update_brush = function(extent) {
        self.brush.extent(extent);
        self.brush(d3.select('.brush-proximity'));
    }

    this.update = function(players) {
        if (typeof players !== 'object') players = [players];

        selectPlayers(players);
    };

    /**
     * @param array $players
     * @return void
     */
    function selectPlayers(players) {
        // ..
    }
}

// Bind to global space
window.proximity = proximity;

})();
