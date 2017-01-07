angular.module('AetherWeatherApp', [ 'jtt_openweathermap' ])

    .controller('WeatherController', function ($scope, openweathermapFactory) {

        $scope.search = function (city, unit) {
            openweathermapFactory.getWeatherFromCitySearchByName({
                q: city,
                lang: "pt",
                units: unit || "",
                type: "accurate",
                appid: 'bd7a5c9fa48599817dfe6e1958ed1d09'
            }).then(function(response){
                $scope.now = response;
                $scope.now.data.dt = moment.unix(response.data.dt).format('LLL');
            }).catch(function (data) {
                console.log(data);
            });

            openweathermapFactory.getForecast5FromCitySearchByName({
                q: city,
                lang: "pt",
                units: unit || "",
                type: "accurate",
                appid: 'bd7a5c9fa48599817dfe6e1958ed1d09'
            }).then(function(data){
                $scope.fiveDays = data;
                console.log(data);
            }).catch(function (data) {
            });
        };

        $scope.convertToCelsius = function (kelvin) {
            if (kelvin) {
                return Math.round(kelvin - 273.15);
            }

            return "";
        };

    });
