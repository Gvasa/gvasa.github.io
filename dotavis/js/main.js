(function(func) {

var rosterColors = [
    '#92A521', // Radiant
    '#A11F17', // Dire
    '#427AF3', // Player 0
    '#86F0BF',
    '#C206BD',
    '#F4FE5F',
    '#FE7A27',
    '#FD9BCE',
    '#CAE972',
    '#81EAF0',
    '#229049',
    '#B58516'
];

function team_color(id) {
    var teamColors = {
        0: rosterColors[0],
        radiant: rosterColors[0],
        5: rosterColors[1],
        dire: rosterColors[1]
    };

    return teamColors[id];
}

function assign_player_color(player) {
    return rosterColors[player];
}

function format_time(seconds) {
    var forHours = seconds / 3600,
        remainder = seconds % 3600,
        forMinutes = remainder / 60,
        forSeconds = remainder % 60;

    return pad(~~forHours) + ':' + pad(~~forMinutes) + ':' + pad(~~forSeconds);
}

function pad(n) {
    return n < 10 ? '0' + n : n;
}

window.assign_player_color = assign_player_color;
window.team_color = team_color;
window.format_time = format_time;

})();

window.files = {
    position: 'vgveg.csv',
    roster: 'vgvegroster.csv'
};

var map = new map(files);
var radar = new radar(files);
var roster = new roster(files);
var proximity = new proximity(files);
var compare = new compare(files);
