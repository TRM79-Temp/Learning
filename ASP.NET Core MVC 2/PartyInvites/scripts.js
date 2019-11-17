console.log('Github API Helper - v.0.11');

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
                fileName: commit.files[0].filename,
                blob_url: commit.files[0].blob_url
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
        // setCookie('gitCommits', txt.replace(/;/g, '$$$'), 1000);
        localStorage.setItem('gitCommits', txt);
    },

    restoreCommits: function () {
        // return getCookie('gitCommits').replace(/\$\$/g, ';');
        return localStorage.getItem('gitCommits');
    }
}