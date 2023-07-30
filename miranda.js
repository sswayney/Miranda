
const mdd = {
    version: '0.0.1',
    bookmarkver: '0.0.1',
    siteName: 'paycomonline.net',
    pageName: 'Dashboard',
    fullUrl: `https://www.paycomonline.net/v4/cl/web.php/Doc/Dashboard`,
    github: `https://github.com/sswayney/Miranda/tree/dev`,
    endpoints: {
        dashboard: '/v4/cl/web.php/Doc/Dashboard'
    },
    init: function () {
        mdd.checks.versions();
        if (window.mdd_processing !== true) {
            if (mdd.checks.location()) {
                $('#mdd__central').find('.complete,.processing').hide();
                $('#mdd__form').show();
                mdd.setup.basicSettings();
                mdd.setup.applyDom();
            } else {
                if (confirm(`This script can only be run from ${mdd.pageName} on ${mdd.siteName}. Would you like to go there now?`)) {
                    document.location = mdd.fullUrl;
                }
            }
        }
    },
    checks: {
        versions: function () {
            function checkBookmarkletVersion() {
                if (typeof window.bookmarkver === 'undefined' || window.bookmarkver !== mdd.bookmarkver) {
                    if (confirm('There\'s been an update to the bookmarklet. Would you like to go to the Github repo in order to get the latest version?')) {
                        alert('Sadly, there]\'s no way to automatically update the bookmark. :/\nScroll down to the "Install" button on the github page. Replace your CURRENT bookmark with the one found there to install the latest bookmark.');
                        document.location.href = mdd.github;
                        return false;
                    }
                }
                return true;
            }

            function checkAppVersion() {
                mdd.prevRunVersion = localStorage.getItem('mdd_ver') ? localStorage.getItem('mdd_ver') : '0';
                localStorage.setItem('mdd_ver', mdd.version);
                if (mdd.version !== mdd.prevRunVersion) {
                    if (confirm('You\'ve gotten the latest update! You are now running Miranda v' + mdd.version + '. Would you like to open the changelog in a new tab?')) {

                            window.open('https://github.com/sswayney/Miranda/releases');

                    }
                }
                return true;
            }

            return mdd.debugging || (checkBookmarkletVersion() && checkAppVersion());
        },
        location: function () {
            return document.location.hostname.split('.').slice(-2).join('.') == mdd.siteName &&
                document.location.href.includes(mdd.pageName) &&
                $('#clientLogout').exists();
        }
    },
    setup: {
        basicSettings: function () {

        },
        applyDom: function () {

            document.title = 'Miranda Document Download';
            $(window).on("error", mdd.error);
            mdd.setup.applyStyles();
            mdd.setup.applyCentral();
        },
        applyStyles: function () {

        },
        applyCentral: function () {

        },



    },
    helpers: {
        getSettings: function () {
            return localStorage.getItem('mdd_storage') ? JSON.parse(localStorage.getItem('mdd_storage')) : false;
        },
        restoreSettings: function () {
            var settings = mdd.helpers.getSettings(),
                rememberSettings = $('#mdd__remember').is(':checked');
            if (settings !== false && rememberSettings) {
                $('#mdd__form input').prop('checked', false).val(''); //Reset all
                for (var i = 0; i < settings.length; i++) {
                    var setting = settings[i],
                        selector = '*[name=\'' + setting.name + '\']';
                    if (setting.value == 'on' || setting.value === '') {
                        $(selector).prop('checked', true);
                    } else {
                        $(selector).val(setting.value);
                    }
                }
                $('.gt-toggle').not(':checked').change();
            }
        },
        saveSettings: function () {
            if ($('#mdd__remember').is(':checked')) {
                if (!$('#mdd__subreddits').is(':checked')) {
                    $('#mdd__sub-list input').prop('checked', false);
                }
                localStorage.setItem('mdd_storage', JSON.stringify($('#mdd__form').serializeArray()));
            } else {
                localStorage.removeItem('mdd_storage');
            }
        },
    },
    actions: {


        delete: function (item) {
            setTimeout(() => {
                if (mdd.performActions) {
                    $.ajax({
                        url: '/api/del',
                        method: 'post',
                        data: {
                            id: item.data.name,
                            executed: 'deleted',
                            uh: mdd.config.uh,
                            renderstyle: 'html'
                        }
                    }).then(function () {
                        mdd.task.items[0].pdDeleted = true;
                        mdd.actions.children.handleSingle();
                    }, function () {
                        mdd.task.info.errors++;
                        if (confirm('Error deleting ' + (item.kind == 't3' ? 'post' : 'comment') + ', would you like to retry?')) {
                            mdd.actions.children.handleSingle();
                        } else {
                            mdd.actions.children.finishItem();
                            mdd.actions.children.handleGroup();
                        }
                    });
                } else {
                    mdd.task.items[0].pdDeleted = true;
                    mdd.task.after = mdd.task.items[0].data.name;
                    mdd.actions.children.handleSingle();
                }
            }, 5000)
        },
        edit: function (item) {
            setTimeout(() => {
                if (mdd.performActions) {
                    $.ajax({
                        url: '/api/editusertext',
                        method: 'post',
                        data: {
                            thing_id: item.data.name,
                            text: mdd.task.config.editText,
                            id: '#form-' + item.data.name,
                            r: item.data.subreddit,
                            uh: mdd.config.uh,
                            renderstyle: 'html'
                        }
                    }).then(function () {
                        mdd.task.items[0].pdEdited = true;
                        mdd.actions.children.handleSingle();
                    }, function () {
                        mdd.task.info.errors++;
                        if (!confirm('Error editing ' + (item.kind == 't3' ? 'post' : 'comment') + ', would you like to retry?')) {
                            item.pdEdited = true;
                        }
                        mdd.actions.children.handleSingle();
                    });
                } else {
                    mdd.task.items[0].pdEdited = true;
                    mdd.actions.children.handleSingle();
                }
            }, 5000)
        },
    },
    ui: {
        updateDisplay: function () {

        },
        done: function () {
            mdd.ui.updateDisplay();
            window.mdd_processing = false;
            document.title = $('#header-bottom-right .user a').first().text() + ' | Power Delete Suite';
            $('#mdd__central h2').first().text('Power Delete Suite v' + mdd.version);

            if (mdd.task.info.edited + mdd.task.info.deleted > 0 || mdd.task.config.isExporting) {
                $('#mdd__central .complete .summary').html('<p>Completed after making ' + mdd.task.info.ajaxCalls + ' calls to the reddit servers.</p> <p>If you need to re run the script, <a class="restart">click here to go back to the beginning!</a></p>');
            } else {
                $('#mdd__central .complete .summary').html('<p>All Done! It seems like all ' + mdd.task.info.ignored + ' items we came across were ignored.</p> <p>If you need to re run the script, <a class="restart">click here to go back to the beginning!</a></p>');
            }
            $('#mdd__central .complete .summary .restart').click(function () {
                mdd.init();
            });

            var numSubs = $('#mdd__sub-list input:checked').length;
            $('#mdd__sub-list input').prop('checked', false);
            var debugInfo = JSON.stringify($('#mdd__form').serializeArray()) + ' number of subreddits: ' + numSubs;

            $('#mdd__central .complete .goodbye').html(
                '<hr/><h3 class="submit-bug">' +
                '<div>Having trouble?</div>' +
                '<div><a href="https://www.reddit.com/message/compose?to=j0be&subject=PowerDeleteSuite%20Config&message=' + encodeURIComponent(debugInfo) + '" target="_blank">Send /u/j0be a message with your current settings.</a></div>' +
                '<div><small>(for privacy, subreddit list is not included)</small></div>' +
                '</h3>');

            if (mdd.task.config.isExporting && mdd.exportItems.length > 0) {
                $('#mdd__central .complete .goodbye').prepend('<hr/><a class="export-button" href=\'data:text/csv;charset=utf-8,' + mdd.exportItems.join("%0A") + '\' download="PowerDeleteSuiteExport.csv">Download Exported Items</a>');
            }

            $('#mdd__central .processing, #mdd__form').hide();
            $('#mdd__central .complete').show();
        }
    },
    error: function () {
        var reset = confirm("We ran into an error. \r\n\r\nWould you like to restart the script?");
        window.mdd_processing = false;
        if (reset) {
            mdd.init();
        }
        return true;
    },
    performActions: true,
    debugging: false
};
mdd.init();
