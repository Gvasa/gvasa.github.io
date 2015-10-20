(function() {
'use strict';

var compare = function(files) {

    var self = this;

    var $div = $('.compare');

    var dimensions,
        accum = { dire: {}, radiant: {} };

    var interesting_dims = ['kills', 'deaths', 'gold', 'xp'];

    d3.csv('data/' + files.roster)
        .row(function(d, i) {
            dimensions = dimensions || Object.keys(d);

            var good_row = {};

            interesting_dims.forEach(function(a) {
                // Convert integers
                good_row[a] = +d[a];

                if (i > 4) {
                    accum.dire[a] = accum.dire[a] || 0;
                    accum.dire[a] += +good_row[a];
                } else {
                    accum.radiant[a] = accum.radiant[a] || 0;
                    accum.radiant[a] += +good_row[a];
                }
            });

            good_row.id = i;

            return good_row;
        })
        .get(function(err, rows) {
            self.data = accum;

            draw();
        });

    function draw() {
        /*
        ['radiant', 'dire'].forEach(function(team) {
            var items = '';

            Object.keys(self.data[team]).map(function(dim) {
                items += '<td class="' + dim + '">' + self.data[team][dim] + '</td>';
            });

            tbody += '<tr>' + items + '</tr>';
        });
        */

        var winner = 'dire',
            looser = 'radiant',
            items = '<h4 id="compare-title">Comparing winners with losers</h4>';

        interesting_dims.forEach(function(d) {
            items += '<div class="compare-entry"><p class="compare-value">' + (Math.round(((self.data[winner][d]-self.data[looser][d])/self.data[winner][d])*100)) + '%</p><p class="compare-name">' + d + '</p></div>';
        });

        $div.html(items);
    }
}

// Bind to global space
window.compare = compare;

})();
