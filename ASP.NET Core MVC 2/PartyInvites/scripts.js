console.log('Github API Helper - v.0.10');

//
// ** Cookies functions
// http://www.w3schools.com/js/js_cookies.asp
//
// Do not forget about cookies symbols - replace ';' to some string before saving and restore it while retrieving
//

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();

    document.cookie = cname + "=" + cvalue + "; " + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');

    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }

    return "";
}

window.githubApiHelper = {
    run: function () {
        var that = this;
        // console.log('Hello World!');
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = async function() {
          if (this.readyState == 4 && this.status == 200) {
            console.log('** Data loaded.');
            var commits = await that.getCommits(this.responseText);
            console.log('** Commits:');
            console.log(commits);
          }
          else {
            console.log('** No data loaded (readyState: ' + this.readyState + ', status: ' + this.status + '):');
          }
        };
        xhr.open("GET", 'https://api.github.com/repos/TRM79-Temp/ASP-PartyInvites-2.0/commits');
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.send();
    },

    getCommits: async function(responseText) {
        document.getElementById('results').value = responseText;

        var result = [];

        var resultObject = JSON.parse(responseText);
        console.log(resultObject);
        for (var i in resultObject) {
            console.log(resultObject[i].commit.message);
            var commitText = await this.getHTML(resultObject[i].url);
            var commit = JSON.parse(commitText);
            // OK console.log(commit.files[0].filename);
            console.log(commit);
            result.push({
                url: commit.html_url,
                message: resultObject[i].commit.message,
                fileName: commit.files[0].filename
            });
        }

        return result;
    },


    getHTML: function (url) {
        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open('get', url);
            xhr.onload = function () {
                var status = xhr.status;
                if (status == 200) {
                    resolve(this.responseText);
                } else {
                    reject(status);
                }
            };
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.send();
        });
    },

    saveCommits: function (txt) {
        setCookie('gitCommits', txt.replace(/;/g, '$$$'), 1000);
    },

    restoreCommits: function () {
        return getCookie('gitCommits').replace(/\$\$/g, ';');
    }
}