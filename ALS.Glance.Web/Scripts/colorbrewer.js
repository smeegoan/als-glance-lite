'use strict';

var colorbrewer = colorbrewer || {
    numClasses: 7,
    schemeNames: {
        sequential: ["BuGn", "BuPu", "GnBu", "OrRd", "PuBu", "PuBuGn", "PuRd", "RdPu", "YlGn", "YlGnBu", "YlOrBr", "YlOrRd"],
        singlehue: ["Blues", "Greens", "Greys", "Oranges", "Purples", "Reds"],
        diverging: ["BrBG", "PiYG", "PRGn", "PuOr", "RdBu", "RdGy", "RdYlBu", "RdYlGn", "Spectral"],
        qualitative: ["Accent", "Dark2", "Paired", "Pastel1", "Pastel2", "Set1", "Set2", "Set3"]
    },
    setNumClasses: function (n) {
        colorbrewer.numClasses = n;
        colorbrewer.showSchemes();
    },
    setSchemeType: function (type) {
        colorbrewer.selectedSchemeType = type;

        $("#num-classes option").removeAttr("disabled");
        switch (colorbrewer.selectedSchemeType) {
            case "sequential":
                if ($("#num-classes").val() >= 10) {
                    $("#num-classes").val(9);
                    colorbrewer.numClasses = 9;
                }
                $("#num-classes option[name=10], #num-classes option[name=11], #num-classes option[name=12]").attr("disabled", "disabled");
                break;
            case "diverging":
                if ($("#num-classes").val() >= 12) {
                    $("#num-classes").val(11);
                    colorbrewer.numClasses = 11;
                }
                $("#num-classes option[name=12]").attr("disabled", "disabled");
                break;
        }
        colorbrewer.showSchemes();
    },
    showSchemes: function () {
        $("#ramps").empty();
        var ramp, svg;
        for (var i in colorbrewer.schemeNames[colorbrewer.selectedSchemeType]) {
            if (colorbrewer.checkFilters(colorbrewer.schemeNames[colorbrewer.selectedSchemeType][i]) == false) continue;
            ramp = $("<div class='ramp " + colorbrewer.schemeNames[colorbrewer.selectedSchemeType][i] + "'></div>"),
                svg = "<svg width='15' height='75'>";
            for (var n = 0; n < 5; n++) {
                svg += "<rect fill=" + colorbrewer.schemes[colorbrewer.schemeNames[colorbrewer.selectedSchemeType][i]][5][n] + " width='15' height='15' y='" + n * 15 + "'/>";
            }
            svg += "</svg>";
            $("#ramps").append(ramp.append(svg).click(function () {
                if ($(this).hasClass("selected")) return;
                colorbrewer.setScheme($(this).attr("class").substr(5));
                analytics.logUiEvent("changeColor", "Patient", "dashboard");
            }));
        }
        if (colorbrewer.selectedSchemeType == "sequential") {
            $("#scheme1").css("width", "160px");
            $("#multi").show().text("Multi-hue");
            $("#scheme2").css("width", "90px");
            $("#single").show().text("Single hue");

            $("#singlehue").empty().css("display", "inline-block");
            for (i in colorbrewer.schemeNames.singlehue) {
                if (colorbrewer.checkFilters(colorbrewer.schemeNames.singlehue[i]) == false) continue;
                ramp = $("<div class='ramp " + colorbrewer.schemeNames.singlehue[i] + "'></div>"),
                    svg = "<svg width='15' height='75'>";
                for (var n = 0; n < 5; n++) {
                    svg += "<rect fill=" + colorbrewer.schemes[colorbrewer.schemeNames.singlehue[i]][5][n] + " width='15' height='15' y='" + n * 15 + "'/>";
                }
                svg += "</svg>";
                $("#singlehue").append(ramp.append(svg).click(function () {
                    if ($(this).hasClass("selected")) return;
                    colorbrewer.setScheme($(this).attr("class").substr(5));
                    analytics.logUiEvent("changeColor", "Patient", "dashboard");
                }));
            }
        } else {
            $("#scheme1").css("width", "100%");
            $("#multi").hide();
            $("#singlehue").empty();
            $("#single").hide();
        }

        $(".score-icon").show();
        $("#color-system").show();
        if ($(".ramp." + colorbrewer.selectedScheme)[0]) {
            colorbrewer.setScheme(colorbrewer.selectedScheme);
        } else if ($("#ramps").children().length) {
            colorbrewer.setScheme($("#ramps .ramp:first-child").attr("class").substr(5));
        } else {
            colorbrewer.clearSchemes();
        }
    },
    clearSchemes: function () {
        $("#counties g path").css("fill", "#ccc");
        $("#color-chips").empty();
        $("#color-values").empty();
        $("#ramps").css("width", "100%");
        $("#scheme-name").html("");
        $(".score-icon").hide();
        $("#color-system").hide();
        $("#ramps").append("<p>No color schemes match these criteria.</p><p>Please choose fewer data classes, a different data type, and/or fewer filtering options.</p>");
    },
    setScheme: function (s) {
        $(".ramp.selected").removeClass("selected");
        colorbrewer.selectedScheme = s;
        $(".ramp." + colorbrewer.selectedScheme).addClass("selected");
        $("#scheme-name").html(colorbrewer.numClasses + "-class " + colorbrewer.selectedScheme);
        colorbrewer.applyColors();
        colorbrewer.drawColorChips();

        var jsonString = "[";
        for (var i = 0; i < colorbrewer.numClasses; i++) {
            jsonString += "'" + colorbrewer.schemes[colorbrewer.selectedScheme][colorbrewer.numClasses][i] + "'";
            if (i < colorbrewer.numClasses - 1) jsonString += ",";
        }
        jsonString += "]";
        $("#copy-json input").val(jsonString);
        var cssString = "";
        for (var i = 0; i < colorbrewer.numClasses; i++) {
            cssString += "." + colorbrewer.selectedScheme + " .q" + i + "-" + colorbrewer.numClasses + "{fill:" + colorbrewer.schemes[colorbrewer.selectedScheme][colorbrewer.numClasses][i] + "}";
            if (i < colorbrewer.numClasses - 1) cssString += " ";
        }
        $("#copy-css input").val(cssString);

        $(".score-icon").attr("class", "score-icon");
        var f = colorbrewer.checkColorblind(s);
        $("#blind-icon").addClass(!f ? "bad" : (f == 1 ? "ok" : "maybe")).attr("title", colorbrewer.numClasses + "-class " + colorbrewer.selectedScheme + " is " + getWord(f) + "color blind friendly");
        f = 1;
        $("#copy-icon").addClass(!f ? "bad" : (f == 1 ? "ok" : "maybe")).attr("title", colorbrewer.numClasses + "-class " + colorbrewer.selectedScheme + " is " + getWord(f) + "photocopy friendly");
        f = colorbrewer.checkScreen(s);
        $("#screen-icon").addClass(!f ? "bad" : (f == 1 ? "ok" : "maybe")).attr("title", colorbrewer.numClasses + "-class " + colorbrewer.selectedScheme + " is " + getWord(f) + "LCD friendly");
        f = colorbrewer.checkPrint(s);
        $("#print-icon").addClass(!f ? "bad" : (f == 1 ? "ok" : "maybe")).attr("title", colorbrewer.numClasses + "-class " + colorbrewer.selectedScheme + " is " + getWord(f) + "print friendly");

        function getWord(w) {
            if (!w) return "not ";
            if (w == 1) return "";
            if (w == 2) return "possibly not ";
            return "";
        };

    },
    checkFilters: function (scheme, f) {
        if (!colorbrewer.schemes[scheme][colorbrewer.numClasses]) return false;
        if (colorbrewer.checkColorblind(scheme) != 1) return false;
        //if (checkPrint(scheme) != 1) return false;
        return true;
    },
    checkColorblind: function (scheme) {
        return colorbrewer.schemes[scheme].properties.blind.length > 1 ? colorbrewer.schemes[scheme].properties.blind[colorbrewer.numClasses - 3] : colorbrewer.schemes[scheme].properties.blind[0];
    },
    checkPrint: function (scheme) {
        return colorbrewer.schemes[scheme].properties.print.length > 1 ? colorbrewer.schemes[scheme].properties.print[colorbrewer.numClasses - 3] : colorbrewer.schemes[scheme].properties.print[0];
    },
    checkScreen:
    function (scheme) {
        return colorbrewer.schemes[scheme].properties.screen.length > 1 ? colorbrewer.schemes[scheme].properties.screen[colorbrewer.numClasses - 3] : colorbrewer.schemes[scheme].properties.screen[0];
    }
    ,
    drawColorChips: function () {
        var svg = "<svg width='24' height='270'>";
        for (var i = 0; i < colorbrewer.numClasses; i++) {
            svg += "<rect fill=" + colorbrewer.schemes[colorbrewer.selectedScheme][colorbrewer.numClasses][i] + " width='24' height='" + Math.min(24, parseInt(265 / colorbrewer.numClasses)) + "' y='" + i * Math.min(24, parseInt(265 / colorbrewer.numClasses)) + "'/>";
        }
        $("#color-chips").empty().append(svg);
    },
    getColorDisplay: function (c, s) {
        if (c.indexOf("#") != 0) {
            var arr = c.replace(/[a-z()\s]/g, "").split(",");
            var rgb = { r: arr[0], g: arr[1], b: arr[2] };
        }
        s = s || $("#color-system").val().toLowerCase();
        if (s == "hex") {
            if (rgb) return rgbToHex(rgb.r, rgb.g, rgb.b);
            return c;
        }
        if (s == "rgb") {
            if (!rgb) rgb = hexToRgb(c);
            return rgb.r + "," + rgb.g + "," + rgb.b;
        }
        if (s == "cmyk") {
            if (!rgb) rgb = hexToRgb(c);
            var cmyk = rgb2cmyk(rgb.r, rgb.g, rgb.b);
            return cmyk[0] + "," + cmyk[1] + "," + cmyk[2] + "," + cmyk[3];
        }
    },
    getCMYK: function (scheme, classes, n) {
        return cmyk[scheme][classes][n].toString();
    },

    rgb2cmyk: function (r, g, b) {
        var computedC = 0;
        var computedM = 0;
        var computedY = 0;
        var computedK = 0;

        // BLACK
        if (r == 0 && g == 0 && b == 0) {
            computedK = 1;
            return [0, 0, 0, 100];
        }

        computedC = 1 - (r / 255);
        computedM = 1 - (g / 255);
        computedY = 1 - (b / 255);

        var minCMY = Math.min(computedC,
                  Math.min(computedM, computedY));
        computedC = (computedC - minCMY) / (1 - minCMY);
        computedM = (computedM - minCMY) / (1 - minCMY);
        computedY = (computedY - minCMY) / (1 - minCMY);
        computedK = minCMY;

        return [Math.round(computedC * 100), Math.round(computedM * 100), Math.round(computedY * 100), Math.round(computedK * 100)];
    },
    rgbToHex: function (r, g, b) {
        return "#" + ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1);
    },
    hexToRgb: function (hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    },
    showColorSchemeButton: function (defaultColor) {
        $("#colorPlaceHolder").replaceWith(' <li class="dropdown">'
            + '   <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">' + alsglance.resources.colorSchemes + '<span class="caret"></span></a>'
            + '    <ul class="dropdown-menu" role="menu">'
            + '        <li>'
            + '            <div class="container" style="max-width: 300px">'
            + '                <div id="scheme" class="form-group">'
            + '                    <div id="scheme1">'
            + '                        <label id="multi"></label>'
            + '                        <div id="ramps"></div>'
            + '                    </div> <!--end scheme1 div-->'
            + '                    <div id="scheme2">'
            + '                        <label id="single"></label>'
            + '                        <div id="singlehue"></div>'
            + '                    </div> <!--end scheme2 div-->'
            + '                </div> <!--end scheme div-->'
            + '            </div>'
            + '        </li>'
            + '    </ul>'
            + '</li>');
        var scheme = defaultColor || "YlGnBu";
        var n = 5;
        $("#num-classes").val(n);
        colorbrewer.setSchemeType("sequential");
        colorbrewer.setNumClasses(n);
        colorbrewer.setScheme(scheme);
        colorbrewer.showSchemes();
    },
    applyColors: function () {
        if (!colorbrewer.schemes[colorbrewer.selectedScheme][colorbrewer.numClasses]) {
            return;
        }
        var colors = colorbrewer.schemes[colorbrewer.selectedScheme][colorbrewer.numClasses].slice(0); //clone the array
        colors.shift(); //skip the first color because it's to faint
        var colorsDiferential = d3.scale.ordinal().range([colorbrewer.schemes[colorbrewer.selectedScheme][colorbrewer.numClasses][1], colorbrewer.schemes[colorbrewer.selectedScheme][colorbrewer.numClasses][2], colorbrewer.schemes[colorbrewer.selectedScheme][colorbrewer.numClasses][3]]);
        var colorRange = d3.scale.ordinal().range(colors);
        var color2 = colorbrewer.schemes[colorbrewer.selectedScheme][colorbrewer.numClasses][2];
        var color3 = colorbrewer.schemes[colorbrewer.selectedScheme][colorbrewer.numClasses][3];
        alsglance.charts.timeOfDayChart.ordinalColors(colors).redraw();
        alsglance.charts.timeHourChart.colors(color2).redraw();
        alsglance.charts.quarterChart.colors(colorRange).redraw();
        alsglance.charts.aucSeriesChart.colors(colorsDiferential).redraw();

        alsglance.charts.dateRangeChart.colors(color2).redraw();
        if (alsglance.charts.emgChart != null) {
            alsglance.charts.emgChart.updateOptions({ colors: [color3] });
        }
    }
};
