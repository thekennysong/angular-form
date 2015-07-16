// scripts/province.js
(function(){

    'use strict';

    angular
        .module('formlyApp')
        .factory('province', province);

        function province() {
            function getDoseType() {
                return [
                    {
                        "name": "for Injection",
                        "value":"for_injection"
                    },
                    {
                        "name":"for Injection, USP",
                        "value":"for_injection_usp"
                    },
                    {
                        "name":"Injection",
                        "value":"injection"
                    },
                    {
                        "name":"Injection, USP",
                        "value":"injection_usp"
                    },
                ];
            }
            function getTherapeuticClass() {
                return [
                    {
                        "name": "Anti-Infectives",
                        "value":"anti_infectives"
                    },
                    {
                        "name":"Critical Care",
                        "value":"critical_care"
                    },
                    {
                        "name":"Anaesthesia",
                        "value":"anaesthesia"
                    },
                    {
                        "name":"Oncology",
                        "value":"oncology"
                    },
                ];
            }
            function getLabelCategory() {
                return [
                    {
                        "name": "RLD / safety update",
                        "value":"rld_safety_update"
                    },
                    {
                        "name":"New product",
                        "value":"new_product"
                    },
                    {
                        "name":"Existing product / Re-branding",
                        "value":"existing_product_re_branding"
                    },
                ];
            }
            function getLabelType() {
                return [
                    {
                        "name": "Fresenius Kabi",
                        "value":"fresenius_kabi"
                    },
                    {
                        "name":"Novation",
                        "value":"novation"
                    },
                    {
                        "name":"NovaPlus",
                        "value":"novaplus"
                    },
                    {
                        "name":"NovaPlus",
                        "value":"novaplus"
                    },
                    {
                        "name":"Premier ProRx",
                        "value":"premier_prorx"
                    },
                ];
            }
            function getManufactureSite(){
                return [
                    {
                        "name": "Melrose Park",
                        "value":"melrose_park"
                    },
                    {
                        "name":"Grand Island",
                        "value":"grand_island"
                    },
                    {
                        "name":"Halden",
                        "value":"halden"
                    },
                    {
                        "name":"Graz",
                        "value":"graz"
                    },
                    {
                        "name":"FKO",
                        "value":"fko"
                    },
                    {
                        "name":"3rd Party",
                        "value":"3rd_party"
                    },
                ];
            }
            function getPrimaryContainer(){
                return [
                    {
                        "name": "for Injection",
                        "value": "for_injection"
                    }, {
                        "name": "for Injection, USP",
                        "value": "for_injection_usp"
                    }, {
                        "name": "Injection",
                        "value": "injection"
                    }, {
                        "name": "Injection, USP",
                        "value": "injection_usp"
                    }
                ];
            }
            function getPrimaryPackaging(){
                return [
                    {
                        "name": "Tray",
                        "value": "tray"
                    }, {
                        "name": "Individual Carton",
                        "value": "individual_carton"
                    }, {
                        "name": "Shelf Carton",
                        "value": "shelf_carton"
                    }, {
                        "name": "N/A",
                        "value": "na"
                    }
                ];
            }
            return {
                getDoseType: getDoseType,
                getTherapeuticClass: getTherapeuticClass,
                getLabelCategory: getLabelCategory,
                getLabelType: getLabelType,
                getManufactureSite: getManufactureSite,
                getPrimaryContainer: getPrimaryContainer,
                getPrimaryPackaging: getPrimaryPackaging
            }
        }

})();