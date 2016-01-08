(function() {
    'use strict';
    var appServices = angular.module('loading.services', []).provider("appBusy", function() {

        // initialize
        this.msg = "Loading ...";
        this.timeout = 1000;
        this.clazz = "appBusy";

        var body = angular.element(window.document.body);
        var domEl = null;

        this.show = function(msg) {
            msg = msg || this.msg;

            // if not already busy
            if (!domEl) {
                domEl = angular.element('<div></div>').addClass(this.clazz);
                domEl.text(msg);
                setTimeout(function() {

                    // if still busy add it to body.
                    if (domEl)
                        body.append(domEl);
                }, this.timeout);
            } else {

                // update busy message
                domEl.text(msg);
            }
        }

        this.hide = function() {
            if (domEl) {
                domEl.remove();
                domEl = null;
            }
        }

        this.$get = function() {
            var self = this;
            return {
                set: function(msg) {
                    if (typeof msg == 'boolean') {
                        msg === true ? self.show() : self.hide();
                    } else self.show(msg);
                }
            }
        }

        this.setMsg = function(val) {
            this.msg = val;
        }

        this.setTimeout = function(val) {
            this.timeout = val;
        }

        this.setClazz = function(val) {
            this.clazz = val;
        }
    });
    angular.module('accdashboardApp', ['ngCookies', 'loading.services', 'ngRoute', 'ui.bootstrap', 'ngTagsInput', 'ui.sortable'])

    .run(function($http, $cookies) {
        // set the CSRF token here
        $http.defaults.headers.post['X-CSRFToken'] = $cookies.csrftoken;
        $http.defaults.headers.put['X-CSRFToken'] = $cookies.csrftoken;

    }).directive('dynamic', function($compile) {
        return {
            restrict: 'A',
            replace: true,
            link: function(scope, ele, attrs) {
                scope.$watch(attrs.dynamic, function(html) {
                    ele.html(html);
                    $compile(ele.contents())(scope);
                });
            }
        };
    })

    .directive('wlgHeight', function() {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                element.height(attrs.wlgHeight);
            }
        }
    })

    .directive('wlgShapeshift', function() {
            return {
                restrict: 'A',
                link: function(scope, element, attrs) {
                    scope.$watch(attrs.wlgShapeshift, function() {
                        setTimeout(function() {
                            $("." + attrs.class).shapeshift({
                                selector: ".single_wl",
                                animated: true,
                                enableCrossDrop: false,
                                gutterX: 15,
                                gutterY: 30,
                                paddingX: 0,
                                paddingY: 20,
                            });
                        }, 1000);
                    });

                    // $(".watchlist_homepage_cards_container").trigger("ss-rearranged");

                    // $(".watchlist_homepage_cards_container").on("ss-rearranged", function(e, selected) {
                    //     console.log("PATCH CALL FOR WL REARRANGED.");
                    //     //  console.log ("This container:", $(this));
                    //     // console.log ("Has rearranged this item:", $(selected));
                    //     // console.log ("Into this position:", $(selected).index());
                    //     $(".watchlist_homepage_cards_container > .single_wl").each(function(){
                    //         console.log($(this).data("name"));
                    //         console.log($(this).data("order"));
                    //         // console.log($(this).index());
                    //         console.log("---------------------------------------");
                    //     });

                    // });
                    // console.log(scope);
                    // console.log(element);
                    // console.log(attrs);
                }

            }
        })
        .directive('fileModel', ['$parse', 'FileAdd', function($parse, FileAdd) {
            return {
                restrict: 'A',
                link: function(scope, element, attrs) {
                    var model = $parse(attrs.fileModel);
                    var modelSetter = model.assign;

                    element.bind('change', function() {
                        scope.$apply(function() {
                            // FileAdd.setFile(element[0].files[0]);

                            modelSetter(scope, element[0].files[0]);
                            scope.$emit('go');

                        });
                    });
                }
            };
        }])
        .directive('focusMe', function($timeout, $parse) {
            return {
                //scope: true,   // optionally create a child scope
                link: function(scope, element, attrs) {
                    var model = $parse(attrs.focusMe);
                    scope.$watch(model, function(value) {
                        console.log('value=', value);
                        if (value === true) {
                            $timeout(function() {
                                element[0].focus();
                            });
                        }
                    });
                    // to address @blesh's comment, set attribute value to 'false'
                    // on blur event:
                    element.bind('blur', function() {
                        scope.$apply(model.assign(scope, false));
                    });
                }
            };
        })

    .controller('MainController', function($scope, $route, $routeParams, $location, $modal, $http) {
            $scope.$route = $route;
            $scope.$location = $location;
            $scope.$routeParams = $routeParams;
            $scope.path = $scope.$location.$$path.split('/')[1];
            $scope.pattern = /^[a-z0-9._]+@[a-z0-9]+\.[a-z.]{2,5}$/;
            $scope.openDelete = function() {
                var modalInstance = $modal.open({
                    animation: true,
                    templateUrl: 'DeleteConfirm.html',
                    controller: 'DeleteInstanceCtrl',
                    size: 'sm',
                    resolve: {
                        // locs: function() {
                        //     return locs;
                        // }
                    }
                });
                modalInstance.result.then(function(condition, id) {

                }, function(condition) {
                    // if (condition) {
                    //     Jobs.Delete(condition);
                    // }
                    // $log.info('Modal dismissed at: ' + new Date());
                });
            };
            $(".container").shapeshift({
                autoHeight: false,
                colWidth: 80,
                // enableTrash: true
            });

            $http.get("/check/?url=http://www.rediff.com/rss/inrss.xml").success(function(data) {
                console.log(data)
                $scope.rssfeds = data;
            });
        })
        .controller('DeleteInstanceCtrl', function($scope, $modalInstance) {

        })



})();