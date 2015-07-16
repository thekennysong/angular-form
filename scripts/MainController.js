(function() {

    'use strict';

    var app = angular.module('formlyApp', ['formly', 'formlyBootstrap','ui.bootstrap','ngFileUpload']);
        app.run(function(formlyConfig) {
            var attributes = [
                'date-disabled',
                'custom-class',
                'show-weeks',
                'starting-day',
                'init-date',
                'min-mode',
                'max-mode',
                'format-day',
                'format-month',
                'format-year',
                'format-day-header',
                'format-day-title',
                'format-month-title',
                'year-range',
                'shortcut-propagation',
                'datepicker-popup',
                'show-button-bar',
                'current-text',
                'clear-text',
                'close-text',
                'close-on-date-selection',
                'datepicker-append-to-body'
            ];

            var bindings = [
                'datepicker-mode',
                'min-date',
                'max-date'
            ];

            var ngModelAttrs = {};

            angular.forEach(attributes, function(attr) {
                ngModelAttrs[camelize(attr)] = {attribute: attr};
            });

            angular.forEach(bindings, function(binding) {
                ngModelAttrs[camelize(binding)] = {bound: binding};
            });

            console.log(ngModelAttrs);

            formlyConfig.setType({
                name: 'datepicker',
                template: '<input class="form-control" ng-model="model[options.key]" is-open="to.isOpen" datepicker-options="to.datepickerOptions" />',
                wrapper: ['bootstrapLabel', 'bootstrapHasError'],
                    defaultOptions: {
                        ngModelAttrs: ngModelAttrs,
                        templateOptions: {
                            addonLeft: {
                            class: 'glyphicon glyphicon-calendar',
                                onClick: function(options, scope) {
                                    options.templateOptions.isOpen = !options.templateOptions.isOpen;
                                }
                            },
                            onFocus: function($viewValue, $modelValue, scope) {
                                scope.to.isOpen = !scope.to.isOpen;
                            },
                                datepickerOptions: {}
                        }
                    }
            });

            function camelize(string) {
                string = string.replace(/[\-_\s]+(.)?/g, function(match, chr) {
                    return chr ? chr.toUpperCase() : '';
                });
                // Ensure 1st char is always lowercase
                return string.replace(/^([A-Z])/, function(match, chr) {
                    return chr ? chr.toLowerCase() : '';
                });
            }

            formlyConfig.setType({
                name: 'repeatSection',
                templateUrl: 'repeatSection.html',
                controller: function($scope) {
                    $scope.formOptions = {formState: $scope.formState};
                    $scope.addNew = addNew;

                    $scope.copyFields = copyFields;

                    function copyFields(fields) {
                      return angular.copy(fields);
                    }

                    function addNew() {
                        $scope.model[$scope.options.key] = $scope.model[$scope.options.key] || [];
                        var repeatsection = $scope.model[$scope.options.key];
                        var lastSection = repeatsection[repeatsection.length - 1];
                        var newsection = {};
                        if (lastSection) {
                            newsection = angular.copy(lastSection);
                        }

                        repeatsection.push(newsection);
                    }
                }
            });

            formlyConfig.setType({
                name: 'upload',
                templateUrl: 'upload.html',
                controller: function ($scope, Upload) {
                    $scope.$watch('files', function () {
                        $scope.upload($scope.files);
                    });
                    $scope.log = '';

                    $scope.upload = function (files) {
                        if (files && files.length) {
                            for (var i = 0; i < files.length; i++) {
                                var file = files[i];
                                Upload.upload({
                                    url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
                                    fields: {
                                        'username': $scope.username
                                    },
                                    file: file
                                }).progress(function (evt) {
                                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                                    $scope.log = 'progress: ' + progressPercentage + '% ' +
                                                evt.config.file.name + '\n' + $scope.log;
                                }).success(function (data, status, headers, config) {
                                    $scope.log = 'file ' + config.file.name + 'uploaded. Response: ' + JSON.stringify(data) + '\n' + $scope.log;
                                    $scope.$apply();
                                });
                            }
                        }
                    };
                }

            });

        });


        app.controller('MainController', MainController);

        function MainController(province) {

            var vm = this;

            vm.onSubmit = onSubmit;
            vm.exampleTitle = 'Repeating Section'; // add this
            vm.env = {
              angularVersion: angular.version.full
              //formlyVersion: formlyVersion
            };



            // The model object that we reference
            // on the <formly-form> element in index.html

            vm.model = {
                containerPackaging: [
                    {
                        investmentName:'abc',
                        investmentDate:(new Date()).toDateString(),
                        stockIdentifier:'',
                        investmentValue:'',
                        relationshipName:'',
                        complianceApprover:'',
                        requestorComment:''
                    }
                ]
            };

            // An array of our form fields with configuration
            // and options set. We make reference to this in
            // the 'fields' attribute on the <formly-form> element
            vm.field = [

            {
                className: 'row',
                fieldGroup: [
                    {
                        className: 'col-md-6 top',
                        key: 'fk_product_manager',
                        type: 'input',
                        templateOptions: {
                            type: 'text',
                            label: 'Fk Product Manager',
                            placeholder: '',
                            required: true
                        }
                    },
                    {
                        className: 'col-md-6 top',
                        key: 'email_address',
                        type: 'input',
                        templateOptions: {
                            type: 'email',
                            label: 'Email Address',
                            placeholder: '',
                            required: true
                        }
                    },
                    {
                        className: 'col-md-4 second-section',
                        key: 'product_name',
                        type: 'input',
                        templateOptions: {
                            type: 'text',
                            label: 'Product Name',
                            placeholder: '',
                            required: true
                        }
                    },
                    {
                        className: 'col-md-4 second-section',
                        key: 'province',
                        type: 'select',
                        templateOptions: {
                            label: 'Dose Type',
                            options: province.getDoseType()
                        }
                    },
                    {
                        className: 'col-md-4 second-section',
                        key: 'therapeutic',
                        type: 'select',
                        templateOptions: {
                            label: 'Therapeutic Class',
                            options: province.getTherapeuticClass()
                        }
                    },
                    {
                        className: 'col-md-4 second-section',
                        key: 'label_category',
                        type: 'select',
                        templateOptions: {
                            label: 'Label Category',
                            options: province.getLabelCategory()
                        }
                    },
                    {
                        className: 'col-md-4 second-section',
                        key: 'label_type',
                        type: 'select',
                        templateOptions: {
                            label: 'Label Type',
                            options: province.getLabelType()
                        }
                    },
                    {
                        className: 'col-md-4 second-section',
                        key: 'manufacture_site',
                        type: 'select',
                        templateOptions: {
                            label: 'Manufacture Site',
                            options: province.getManufactureSite()
                        }
                    },
                    {
                        className: 'col-md-4 second-section',
                        key: 'third_party',
                        type: 'input',
                        templateOptions: {
                            type: 'text',
                            label: 'Third Party',
                            placeholder: '',
                            required: true
                        },
                        hideExpression: 'model.manufacture_site !== "3rd_party"'
                    },
                    {
                        className: 'col-md-4 second-section',
                        key: 'number_of_presentations',
                        type: 'input',
                        templateOptions: {
                            type: 'text',
                            label: 'Number of Presentations',
                            placeholder: '',
                            required: true
                        }
                    },
                    {
                        className: 'col-md-4',
                        key: 'date',
                        type: 'datepicker',
                        templateOptions: {
                          label: 'Draft Label by',
                          type: 'text',
                          datepickerPopup: 'dd-MMMM-yyyy'
                        }
                    },
                    {
                        className: 'col-md-4',
                        key: 'date2',
                        type: 'datepicker',
                        templateOptions: {
                          label: 'FDA Submission',
                          type: 'text',
                          datepickerPopup: 'dd-MMMM-yyyy'
                        }
                    },
                    {
                        className: 'col-md-4',
                        key: 'date3',
                        type: 'datepicker',
                        templateOptions: {
                          label: 'Launch Date',
                          type: 'text',
                          datepickerPopup: 'dd-MMMM-yyyy'
                        }
                    },
                    {
                        className: 'col-md-4',
                        key: 'date3',
                        type: 'datepicker',
                        templateOptions: {
                            label: 'Submit to MLR by',
                            type: 'text',
                            datepickerPopup: 'dd-MMMM-yyyy'
                        },
                        hideExpression: 'model.label_category !== "new_product"'
                    },
                    {
                        className: 'col-md-4',
                        key: 'date4',
                        type: 'datepicker',
                        templateOptions: {
                            label: 'MLR Approval by',
                            type: 'text',
                            datepickerPopup: 'dd-MMMM-yyyy'
                        },
                        hideExpression: 'model.label_category !== "new_product"'
                    },
                    {
                    type: 'textarea',
                    key: 'productPositioningTalkingPoints',
                        templateOptions:
                        {
                            label: 'Requestor Comment',
                            rows: 4
                        },
                        hideExpression: 'model.label_category !== "new_product"'
                    }
                ]
            },

            {
                type: 'repeatSection',
                key: 'containerPackaging',
                templateOptions: {
                    btnText: '+',
                    fields: [{
                            className: 'row',
                            fieldGroup: [{
                                className: 'col-xs-4 primary-container',
                                key: 'label_category',
                                type: 'select',
                                templateOptions: {
                                    label: 'Primary Container',
                                    placeholder: 'Select',
                                    // Call our province service to get a list
                                    // of provinces and territories
                                    options: province.getPrimaryContainer()
                                }
                            }, {
                                type: 'input',
                                key: 'NDC',
                                className: 'col-xs-2 ndc-sub',
                                templateOptions: {
                                    label: 'NDC'
                                }
                            }, {
                                type: 'input',
                                key: 'NDC2',
                                className: 'col-xs-2 ndc-sub',
                                templateOptions: {
                                    label: 'NDC2'
                                }
                            }]
                        }, {
                            type: 'input',
                            key: 'strengthAndConcentration',
                            templateOptions: {
                                label: 'Strength and Concentration'
                            }
                        }, {
                            type: 'input',
                            key: 'colorAssignments',
                            templateOptions: {
                                label: 'Color Assignments'
                            }
                        }, {
                            type: 'input',
                            key: 'primaryLabelPartNumber',
                            templateOptions: {
                                label: 'Primary Label Part Number'
                            }
                        },{
                            key: 'primary_packaging',
                            type: 'select',
                            templateOptions: {
                                label: 'Primary Packaging (if applicable)',
                                placeholder: 'Select',
                                // Call our province service to get a list
                                // of provinces and territories
                                options: province.getPrimaryPackaging()
                            }
                        },{
                            key: 'quantity',
                            type: 'input',
                            templateOptions: {
                                label: 'Quantity',
                                type: 'text'
                            },
                            hideExpression: 'model.primary_packaging !== "tray"'
                        },{
                            type: 'input',
                            key: 'dielines',
                            templateOptions: {
                                label: 'Dielines (die number or dimensions)'
                            }
                        },{
                            type: 'input',
                            key: 'primary_packaging_part_number',
                            templateOptions: {
                                label: 'Primary Packaging Part Number'
                            }
                        }

                    ]
                }

            },
            {
                className: 'col-md-6',
                key: 'existingAssets',
                type: 'upload',
                templateOptions: {
                    type: 'text',
                    label: 'Existing Assets',
                    placeholder: '',
                    required: true
                }
            }


            ];

            vm.originalFields = angular.copy(vm.fields);
            // function definition
            function onSubmit() {
              alert(JSON.stringify(vm.model), null, 2);
            }


        }

})();