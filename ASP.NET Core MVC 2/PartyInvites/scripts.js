// localStorage.projects = JSON.stringify([{
//     name: 'party_Invites_2_0',
//     active: true,
//     apiUrl: 'https://api.github.com/repos/TRM79-Temp/ASP-PartyInvites-2.0/commits',
//     commits: localStorage.party_Invites_2_0
// }])

console.log('Github API Helper - v.0.28');

window.GithubApiHelper = function () {
    this.projects = JSON.parse(localStorage.getItem('projects'));

    this.editingMode = (localStorage.editingMode === 'true');

    this.getCommits = function (commitsApiUrl, commitsToLoad) {
        // commitsApiUrl: 'https://api.github.com/repos/TRM79-Temp/ASP-PartyInvites-2.0/commits'
        var that = this;

        async function getCommitsInt (commitsObjectText) {
            var result = [];
            var commitsObject = JSON.parse(commitsObjectText);

            try {
                if (commitsToLoad == 0 || commitsToLoad > commitsObject.length) {
                    commitsToLoad = commitsObject.length;
                }
                var commitsLoaded = 0;

                for (var i = 0; i < commitsObject.length && commitsLoaded < commitsToLoad; i++) {
                    console.log(commitsObject[i].commit.message);
                    var commitText = await that.getCommit(commitsObject[i].url);
                    var commit = JSON.parse(commitText);

                    result.push({
                        url: commit.html_url,
                        message: commitsObject[i].commit.message,
                        fileName: commit.files[0].filename,
                        blob_url: commit.files[0].blob_url
                    });

                    commitsLoaded++;
                }
            }
            catch (exception) {
                result.push({
                    message: JSON.stringify(exception)
                });
            }

            return result;
        };

        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            const maxTries = 10;
            var tryCount = 1;
            xhr.onreadystatechange = async function() {
                if (this.readyState == 4 && this.status == 200) {
                    console.log('** Commits list loaded.');

                    var commits = await getCommitsInt(this.responseText);
                    console.log('** Commits loaded.');

                    resolve(commits);
                }
                else if (tryCount <= maxTries) {
                    console.log('** No data loaded (readyState: ' + this.readyState
                        + ', status: ' + this.status + '), try #' + tryCount + '.');
                    tryCount++;
                }
                else {
                    console.log('** Rejected (readyState: ' + this.readyState
                        + ', status: ' + this.status + '), tries: ' + tryCount + '.');
                    reject(this.status);
                }
            };
            xhr.open("GET", commitsApiUrl);
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.send();
        });
    };

    this.getCommit = function (url) {
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
    };

    this.saveCommits = function (name, commitsApiUrl, commits, text) {
        // setCookie('gitCommits', txt.replace(/;/g, '$$$'), 1000);
        // localStorage.setItem('party_Invites_2_0', txt);
        var found = false;
        for (var i = 0; i < this.projects.length; i++) {
            if (this.projects[i].name == name) {
                this.projects[i].apiUrl = commitsApiUrl;
                this.projects[i].commits = commits;
                this.projects[i].text = text;
                found = true;
            }
        }

        if (!found) {
            this.projects.push({
                name: name,
                apiUrl: commitsApiUrl,
                commits: commits,
                text: text
            });
        }

        localStorage.setItem('projects', JSON.stringify(this.projects));
    };

    this.getActiveProject = function () {
        // return getCookie('gitCommits').replace(/\$\$/g, ';');
        for (var i = 0; i < this.projects.length; i++) {
            if (this.projects[i].active) {
                return this.projects[i];
            }
        }

        return null;
    }

    this.changeActiveProject = function (project) {

    }
}

//

window.onload = function () {
    var githubApiHelper = new window.GithubApiHelper();

    document.getElementById('btnDownload').onclick = async function() {
        console.log('Download');

        var url = document.getElementById('commitsApiUrl').value;
        if (url == '') {
            alert('Enter a valid url to the \'Commits API URL\' field.');
            return;
        }

        var commitsToLoadText = document.getElementById('commitsToLoad').value;
        var commitsToLoad = Number.parseInt(commitsToLoadText);
        if (isNaN(commitsToLoad)) {
            alert('Enter a valid number to the \'Commits to load\' field.');
            return;
        }

        try {
            console.log('** Commits to load:');
            console.log(commitsToLoad);

            var resultObject = await githubApiHelper.getCommits(url, commitsToLoad);
            resultObject.reverse();
            console.log('** Result object:');
            console.log(resultObject);

            document.getElementById('commits').value =
                JSON.stringify(resultObject);
        }
        catch (error) {
            console.log('** An error woccured while downloading:');
            console.log(error);
        }
    };

    document.getElementById('btnSave').onclick = function() {
        console.log('Save');
        // console.log(document.getElementById('projects').value);
        // console.log(document.getElementById('commitsApiUrl').value);
        // console.log(document.getElementById('commits').value);
        // console.log(document.getElementById('textEdit').value);
        githubApiHelper.saveCommits(
            document.getElementById('projects').value,
            document.getElementById('commitsApiUrl').value,
            document.getElementById('commits').value,
            document.getElementById('textEdit').value
        );
    }

    document.getElementById('btnShow').onclick = function() {
        console.log('Show');
        document.getElementById('commits').value = githubApiHelper.restoreCommits();
    }

    document.getElementById('projects').onchange = function() {
        console.log(this.value);
    }

    document.getElementById('editingMode').onchange = function() {
        localStorage.editingMode = this.checked;
        githubApiHelper.editingMode = this.checked;
    }

    // -------------------------------------------------

    var selectProject = '';
    for (var i = 0; i < githubApiHelper.projects.length; i++) {
        selectProject += '<option>' + githubApiHelper.projects[i].name + '</option>';
    }

    this.document.getElementById('projects').innerHTML = selectProject;

    //

    document.getElementById('editingMode').checked = githubApiHelper.editingMode;

    //

    var activeProject = githubApiHelper.getActiveProject();
    document.getElementById('commitsApiUrl').value = activeProject.apiUrl;
    document.getElementById('commits').value = activeProject.commits;
    document.getElementById('textEdit').value = activeProject.text;

    //

    if (!githubApiHelper.editingMode) {
        document.getElementById('text').innerHTML = activeProject.text;
    }

    //

    var commits = JSON.parse(activeProject.commits);
    var commitsSpan = document.getElementsByTagName('span');

    for (var i = 0; i < commitsSpan.length; i++) {
        if (commitsSpan[i].hasAttribute('data-listing')) {
            var listingAttr = commitsSpan[i].getAttribute('data-listing');
            if (typeof(listingAttr) == 'undefined' || listingAttr == null || listingAttr == '') {
                continue;
            }

            var commitIndex = commits.findIndex(el => el.message == listingAttr);
            if (commitIndex >= 0) {
                commitsSpan[i].innerHTML =
                    '<a href="' + commits[commitIndex].blob_url + '">' + listingAttr + '</a>';

                var previousVersionIndex = commits.findIndex(el => el.fileName == commits[commitIndex].fileName);
                if (previousVersionIndex < commitIndex) {
                    commitsSpan[i].innerHTML +=
                        ' (<a href="' + commits[commitIndex].url + '">Δ</a>)'
                }
            }
        }
    }
}