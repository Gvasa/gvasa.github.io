(function() {
'use strict';

var roster = function() {

    var self = this;

    var $table = $('.roster');

    var dimensions,
        dimension_scales = {},
        max = { dire: {}, radiant: {} };

    d3.csv('data/' + files.roster)
        .row(function(d, i) {
            dimensions = dimensions || Object.keys(d);

            dimensions.forEach(function(a) {
                if (a === 'heroName' || a === 'playerName') return;

                // Convert integers
                d[a] = +d[a];

                if (i > 4) {
                    max.dire[a] = max.dire[a] || 0;
                    max.dire[a] = d[a] > max.dire[a] ? d[a] : max.dire[a];
                } else {
                    max.radiant[a] = max.radiant[a] || 0;
                    max.radiant[a] = d[a] > max.radiant[a] ? d[a] : max.radiant[a];
                }
            });

            d.id = i;

            return d;
        })
        .get(function(err, rows) {
            self.data = rows;

            // Create scales for each integer dimension
            [0, 5].forEach(function(team) {
                dimension_scales[team] = {};

                dimensions.forEach(function(a) {
                    if (a === 'heroName' || a === 'playerName') return;

                    dimension_scales[team][a] = d3.scale.linear()
                        .range([0, 1])
                        .domain(d3.extent(rows.slice(team, team + 5), function(d) { return d[a]; }));
                });
            });

            draw();
        });

    $('thead th').on('click', function(event) {
        var $this = $(this),
            id = $this.data('sort'),
            temp = self.data,
            radiant = temp.splice(0, 5),
            dire = temp.splice(0, 5);

        $this.addClass('desc').siblings().removeClass('desc');

        radiant.sort(function(a, b) {
            return (a[id] === b[id] ? 0 : (a[id] > b[id] ? -1 : 1));
        });

        dire.sort(function(a, b) {
            return (a[id] === b[id] ? 0 : (a[id] > b[id] ? -1 : 1));
        });

        self.data = radiant.concat(dire);
        draw();
    });

    function draw() {
        var tbody = '<tr class="pick-team pick-all center"><td colspan="' + dimensions.length+1 + '">Show all</td></tr>',
            team_name = {0: 'Radiant', 5: 'Dire'};

        self.data.map(function(d, i) {
            var items = '';

            dimensions.map(function(dim) {
                if (!(dim === 'heroName' || dim === 'id' || dim === 'playerName')) {
                    if (i < 4) {
                        items += '<td style="background-color: rgba(255,156,105,' + dimension_scales[0][dim](d[dim]) + ');" class="' + dim;

                        if (max.radiant[dim] === d[dim])
                            items += ' max">' + d[dim] + '</td>';
                        else
                            items += '">' + d[dim] + '</td>';
                    } else {
                        items += '<td style="background-color: rgba(255,156,105,' + dimension_scales[5][dim](d[dim]) + ');" class="' + dim;

                        if (max.dire[dim] === d[dim])
                            items += ' max">' + d[dim] + '</td>';
                        else
                            items += '">' + d[dim] + '</td>';
                    }
                }
            });

            if (i % 5 === 0)
                tbody += '<tr class="pick-team center" data-id="' + i + '"><td colspan="' + dimensions.length+1 + '">' + 'Show ' + team_name[i] + '</td></tr>';

            tbody += '<tr data-id="' + d.id + '"><td><i class="d2mh ' + d.heroName + '"></i></td><td><svg width="32" height="32"><circle cx="16" cy="16" r="7" fill="' + assign_player_color(d.id+2) + '" stroke="black" stroke-width="0.5" /></svg></td><td class="playerName">' + d.playerName + '</td>' + items + '</tr>';
        });

        $table.children('tbody').html(tbody);
    }

    $table.on('click', 'tbody tr', function(event) {
        event.preventDefault();

        var $this = $(this),
            id = $this.data('id'),
            players;

        $this.toggleClass('focused').siblings().removeClass('focused');

        if ($this.hasClass('pick-all')) {
            players = d3.range(0, 12);
        } else if ($this.hasClass('pick-team')) {
            players = d3.range(id, id + 5);
        } else {
            players = id;
        }
        map.update(players);
        radar.update(players);
    });
}

// Bind to global space
window.roster = roster;

})();
