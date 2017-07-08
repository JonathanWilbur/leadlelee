# LeadleLee

LeadleLee is a simple leaderboard web application named after the battlecry
of a certain famous pink starfish. It is initially set up to be a 
leaderboard for weightlifting, but it is designed so it can be customized.

## Installation and Setup

### File placement

All of the files of ParanoYak need to be installed in a root-level directory
named `leaderboard`. When installed, the path to `main.js` should be 
`/leaderboard/server/main.js`. If this is the case, then you have installed the
files to the correct location.

### Running LeadleLee

You can run ParanoYak with `sudo npm start` or `sudo node /leaderboard/server/main.js`.
Make sure there is an opening in your firewall for port 443 (the default port for
HTTPS traffic), and optionally, but preferrably port 80 (the default port for
unencrypted HTTP traffic) as well. Note that, if a user connects to the 
unencrypted page, he will be immediately redirected to the encrypted page.
The unencrypted page exists just for convenience. You will need to run it as
administrator.

## Contact Me

If you would like to suggest fixes or improvements on this library, please just
comment on this on GitHub. If you would like to contact me for other reasons,
please email me at [jonathan@wilbur.space](mailto:jonathan@wilbur.space). :boar: