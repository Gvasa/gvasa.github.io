(function() {
'use strict';

var map = function(files) {

    var self = this;

    var tt = d3.select('body')
        .append('div')
        .attr('class', 'tooltip');

    var $div = $('.map');

    var width = $div.width(),
        height = $div.height();

    var x = d3.scale.linear()
            .range([0, width])
            .domain([-1000, 15500]),

        y = d3.scale.linear()
            .range([0, height])
            .domain([-15800, -600]),

        time_scale = d3.scale.linear()
            .range([0, width]),

        opacity_scale = d3.scale.linear()
            .range([0.5, 1])
            .domain([0, 1]);

    var line = d3.svg.line();

    var ramp = d3.scale.linear()
        .range(['blue', 'yellow', 'red']);

    var svg = d3.select('.map').append('svg')
        .attr('width', width)
        .attr('height', height)

    /*
    var axis_x = d3.svg.axis()
        .scale(time_scale)
        .tickFormat(function(d) {
            return format_time(d);
        })
        .ticks(3)
        .orient('bottom');
    */

    var spectrum_svg = d3.select('.map').append('svg')
        .attr('width', width)
        .attr('height', 20)
        .append('svg:g')
        .attr('class', 'time-spectrum');

    var shouldAnimate = d3.select(".buttonOptions")
        .on("change", function() {
        var display = this.checked ?  true   : false;
    
    var tt = d3.select('body')
        .append('div')
        .attr('class', 'tooltip');
    });

    // Time brushing
    this.brush = d3.svg.brush()
        .x(time_scale)
        .on('brushstart', brushed_start)
        .on('brush',  brushed)
        .on('brushend', function() {
        });

    d3.csv('data/' + files.position)
        .row(function(d) {
            return d3.range(10).map(function(i) {
                return {
                    id: i,
                    hero: d['Hero' + i],
                    x: +d['Hero' + i + 'Posx'],
                    y: +d['Hero' + i + 'Posy'],
                    time: +d['Time']
                };
            });
        })
        .get(function(err, rows) {
            self.data = rows;

            // Color
            ramp.domain([0, self.data.length/2, self.data.length]);

            time_scale.domain(d3.extent(rows, function(d) { return d[0].time; }));

            self.player_data = [];
            d3.range(10).forEach(function(player) {
                self.player_data[player] = self.data.map(function(d, i) {
                    return d[player];
                });
            });

            draw();
            drawSpectrumGradient(spectrum_svg, width);
        });

    $('#time-color-cb').on('change', function() {
        $('#motherhugger').html('');
        
        draw();
    });

    function draw() {
        // Positions
        var foo = $('#time-color-cb').is(':checked');

        d3.range(10).forEach(function(player) {
            setTimeout(function() {
                svg.attr('id', 'motherhugger')
                    .append('g')
                    //.attr('class', 'foreground circle-player-' + player)
                    .attr('class', 'foreground')
                    .selectAll('circle')
                    .data(self.player_data[player])
                    .enter()
                    .append('circle')
                    .attr('data-player', function(d) { return d.id; })
                    .attr('r', 2)
                    .attr('cx', function(d) { return x(d.x); })
                    .attr('cy', function(d) { return y(-d.y); })
                    .style('fill', function(d, i) { return foo ? ramp(i) : assign_player_color(d.id+2); })
                    .style('opacity', 0.5)

                    .on("mousemove", function(d) {
                        tt.transition()
                            .duration(200)
                            .style('opacity', 0.9)
                            .style('left', (d3.event.pageX + 20) + 'px')
                            .style('top', (d3.event.pageY - 28) + 'px');

                        var playerName;
                        roster.data.forEach(function(a) {
                            if (d.id === a.id) {
                                playerName = a.playerName;
                            }
                        });

                        tt.html('<strong>' + playerName + '</strong><br>'
                                + format_time(d.time));
                    })
                    .on("mouseout", function(d) {
                        tt.transition()
                            .style('opacity', 0);
                    });
            });
        });
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
        //var animateMovement = shouldAnimate[0][0].checked;
        var animateMovement = false;

        $('[data-player]').hide().css('opacity', 0);

        if(animateMovement === false) {
            players.forEach(function(d) {
                $('[data-player=' + d + ']').show().css('opacity', opacity_scale(0.9/players.length));
            });
        } else if (animateMovement === true) {
            players.forEach(function(d) {
                $('[data-player=' + d + ']').show();
            });

            d3.range(Math.min.apply(Math, players),(Math.max.apply(Math, players))+1).forEach(function(player) {
                svg.selectAll('circle')      
                .transition()
                .duration(10)
                .delay(function(d, i) { return 10*i; })
                .style('opacity', opacity_scale(0.9/players.length));
                
            });
        }
    }

    function drawSpectrumGradient(svg, width) {
        var gradient = svg.append('svg:defs')
            .append('svg:linearGradient')
            .attr('id', 'time-spectrum-gradient')
            .attr('x1', '0%')
            .attr('y1', '0%')
            .attr('x2', '100%')
            .attr('y2', '0%')
            .attr('spreadMethod', 'pad');

        gradient.append('svg:stop')
            .attr('offset', '0%')
            .attr('stop-color', 'blue')
            .attr('stop-opacity', '1');

        gradient.append('svg:stop')
            .attr('offset', '50%')
            .attr('stop-color', 'yellow')
            .attr('stop-opacity', '1');

        gradient.append('svg:stop')
            .attr('offset', '100%')
            .attr('stop-color', 'red')
            .attr('stop-opacity', '1');

        svg.append('svg:rect')
            .attr('width', width)
            .attr('height', 20)
            .style('fill', 'url(#time-spectrum-gradient)');

        svg.append('g')
            .attr('class', 'brush-map')
            .call(self.brush)
            .selectAll('rect')
            .attr('height', 20)
            .on('mousemove', function() {
                if (self.brush.empty()) {
                    var offset = $(d3.event.target).closest('svg').offset().top,
                        time = format_time(time_scale.invert(d3.event.offsetX));

                    tt.transition()
                        .style('opacity', 0.9)
                        .style('left', d3.event.pageX + 'px')
                        .style('top', (offset - 50) + 'px');
                    tt.html('<strong>' + time + '</strong><br>');
                }
            })
            .on('mouseout', function() {
                tt.transition()
                    .style('opacity', 0)
            });

        // Time spectrum text
        var alignment = ['left', 'center', 'center', 'center', 'right'],
            times = [];
        d3.range(5).forEach(function(part) {
            times.push('<span class="time" style="text-align: ' + alignment[part] + '">' + format_time(time_scale.domain()[1]/4*part) + '</span>');
        });
        $div.append('<div class="spectrum-times">' + times.join('') + '</div>');
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
        proximity.update_brush(s);
    }

    /**
     * Update this brush and all it does.
     *
     * @param array  extent
     * @return void
     */
    this.update_brush = function(extent) {
        self.brush.extent(extent);
        self.brush(d3.select('.brush-map'));
        brushed();
    }

    /**
     * Debug function to draw centroids.
     *
     * @param array  centroids
     * @return void
     */
    this.draw_centroids = function(centroids) {
        svg.append('svg:g')
            .attr('class', 'centroids')
            .selectAll('circle')
            .data(centroids)
            .enter()
            .append('circle')
            .attr('r', 10)
            .attr('cx', function(d) { return x(d.x); })
            .attr('cy', function(d) { return y(-d.y); })
            .style('fill', 'violet')
            .style('opacity', 0.2);
    }
}

// Bind to global space
window.map = map;

})();
