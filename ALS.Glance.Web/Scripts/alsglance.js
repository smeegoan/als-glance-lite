'use strict';
var alsglance = alsglance || {};
alsglance.charts = alsglance.charts || {
    muscleChartId: 1,
    removeInvalidBins: function (sourceGroup) {
        return {
            all: function () {
                return sourceGroup.all().filter(function (d) {
                    return d.value > 0;
                });
            }
        };
    },
    removeOverlapedAxisTicks: function (ticks) {
        for (var j = 0; j < ticks.length; j++) {
            var c = ticks[j],
                n = ticks[j + 1];
            if (!c || !n || !c.getBoundingClientRect || !n.getBoundingClientRect)
                continue;
            while (c.getBoundingClientRect().right > n.getBoundingClientRect().left) {
                d3.select(n).remove();
                j++;
                n = ticks[j + 1];
                if (!n)
                    break;
            }
        }
    },
    setBehaviour: function () {
        alsglance.charts.replaceControlsBehaviour();
        $(window).resize(function () {
            if (this.resizeTO) clearTimeout(this.resizeTO);
            this.resizeTO = setTimeout(function () {
                $(this).trigger('resizeEnd');
            }, 500);
        });
        $(window).bind('resizeEnd', function () {
            //window hasn't changed size in 500ms
            alsglance.charts.resizeAll();
        });
    },
    addXAxis: function (chartToUpdate, displayText) {
        if (chartToUpdate == null)
            return;

        $("#chart" + chartToUpdate.__dcFlag__).remove();
        chartToUpdate.svg()
            .append("text")
            .attr("id", "chart" + chartToUpdate.__dcFlag__)
            .attr("class", "x-axis-label x-label")
            .attr("text-anchor", "middle")
            .attr("x", chartToUpdate.width() / 2)
            .attr("y", chartToUpdate.height())
            .text(displayText);
    },
    turnOffControls: function (chart) {
        return function () {
            var node = chart.root()[0][0];
            if (node != null) {
                var grandparent = node.parentNode.parentNode;
                d3.select(grandparent).selectAll('.reset').style('display', 'none');
                d3.select(grandparent).selectAll('.filter')
                    .style('display', 'none').text(chart.filter());
            }
            return chart;
        };
    },
    turnOnControls: function (chart) {
        return function () {
            var node = chart.root()[0][0];
            if (node != null) {
                var grandparent = node.parentNode.parentNode;
                var filterPrinter = chart.filterPrinter();
                d3.select(grandparent).selectAll('.reset').style('display', null);
                d3.select(grandparent).selectAll('.filter')
                    .text(filterPrinter(chart.filters())).style('display', null);
            }
            return chart;
        };
    },
    replaceControlsBehaviour: function () {
        for (var i = 0; i < dc.chartRegistry.list().length; i++) {
            var chart = dc.chartRegistry.list()[i];
            chart.turnOnControls = alsglance.charts.turnOnControls(chart);
            chart.turnOffControls = alsglance.charts.turnOffControls(chart);
        }
    },
    resize: function (chart) {
        if (chart == null) {
            return;
        }
        var parent = $("#" + chart.anchorName()).parent();
        var width = parent.width();
        if (width == null) {
            return;
        }
        var height;
        if (chart.hasOwnProperty("rangeChart")) {
            var range = chart.rangeChart();
            if (range != null) {
                height = $("#" + chart.anchorName()).parent().parent().height() - range.height();
                chart.height(height);
                $("#" + chart.anchorName()).height(height);
                $("#" + chart.anchorName()).parent().height(height); //required to fix div size or else drag drop will have some issues
            }
        }
        height = parent.height();
        var children = parent.children().size();
        chart.width(width);
        if (children == 1) {
            chart.height(height);
        }
        if (chart.hasOwnProperty("radius")) //pie chart
        {
            chart.radius(Math.min(width, height) / 2.5);
            chart.innerRadius(chart.radius() / 2);
        }
    },
    resizeAll: function () {
        var i, chart;
        for (i = 0; i < dc.chartRegistry.list().length; i++) {
            chart = dc.chartRegistry.list()[i];
            chart.transitionDuration(0);
            alsglance.charts.resize(chart);
        }
        dc.renderAll();
        for (i = 0; i < dc.chartRegistry.list().length; i++) {
            chart = dc.chartRegistry.list()[i];
            chart.transitionDuration(500);
        }
        if (alsglance.charts.emgChart != null)
            alsglance.charts.emgChart.resize();
    },
};
alsglance.presentation = alsglance.presentation || {
    arrangePanels: function (position) {
        var source = alsglance.presentation.panelsPosition();
        for (var i = 0; i < position.length; i++) {
            var target = position[i];
            if (target != source[i]) {
                $("#" + source[i]).swap($("#" + target));
                i = 0;
                source = alsglance.presentation.panelsPosition();
            }
        }
    },
    panelsPosition: function () {
        return $("div.box").not('.no-drop').map(function () { return this.id; }) // convert to set of IDs
            .get();
    },
    makePanelsDraggable: function () {
        //
        // Swap 2 elements on page. Used by makePanelsDraggable function
        //
        jQuery.fn.swap = function (b) {
            b = jQuery(b)[0];
            var a = this[0];
            var t = a.parentNode.insertBefore(document.createTextNode(''), a);
            b.parentNode.insertBefore(a, b);
            t.parentNode.insertBefore(b, t);
            t.parentNode.removeChild(t);
            return this;
        };
        //
        //  Function maked all .box selector is draggable, to disable for concrete element add class .no-drop
        //
        $("div.box").not('.no-drop').attr("id", function (i) {
            return "draggable_" + i;
        })
            .draggable({
                revert: true,
                zIndex: 2000,
                cursor: "crosshair",
                handle: '.box-name',
                opacity: 0.8
            })
            .droppable({
                tolerance: 'pointer',
                drop: function (event, ui) {
                    var draggable = ui.draggable;
                    var droppable = $(this);
                    draggable.swap(droppable);
                    setTimeout(function () {
                        var dropmap = droppable.find('[id^=map-]');
                        var dragmap = draggable.find('[id^=map-]');
                        if (dragmap.length > 0 || dropmap.length > 0) {
                            dragmap.resize();
                            dropmap.resize();
                        }
                        else {
                            draggable.resize();
                            droppable.resize();
                            draggable.css("width", ''); //required for Firefox
                            droppable.css("width", '');//required for Firefox
                            draggable.css("height", ''); //required for Firefox
                            droppable.css("height", '');//required for Firefox
                            alsglance.charts.resizeAll();
                        }
                    }, 50);
                    setTimeout(function () {
                        draggable.find('[id^=map-]').resize();
                        droppable.find('[id^=map-]').resize();
                    }, 250);
                }
            });
    },
    bindButtonEvents: function () {
        $("#reset").click(function () {
            alsglance.dashboard.patient.reset();
            alsglance.presentation.arrangePanels(["draggable_0", "draggable_1", "draggable_2", "draggable_3", "draggable_4"]);
            alsglance.charts.resizeAll();
            analytics.logUiEvent("reset", "Patient", "dashboard");
        });
        $("#save").click(function () {
            alsglance.dashboard.patient.saveSettings();
            analytics.logUiEvent("save", "Patient", "dashboard");
        });
        $("#saveOptions").click(function () {
            alsglance.dashboard.settings.showPredictions = $("#showPredictions").is(':checked');
            alsglance.dashboard.settings.showFailureThreshold = $("#showFailureThresHold").is(':checked');
            alsglance.dashboard.settings.predictionBackLog = parseInt($('input[name=predictionBacklog]:checked', '#aucForm').val());
            $('#aucOptions').modal('hide');
            alsglance.dashboard.settings.atThreshold = parseFloat($("#AT_Threshold").val());
            alsglance.dashboard.settings.scmThreshold = parseFloat($("#SCM_Threshold").val());
            alsglance.dashboard.settings.fcrThreshold = parseFloat($("#FCR_Threshold").val());
            alsglance.dashboard.settings.envelopeWindowSize = parseInt($("#envelopeWindowSize").val());
            alsglance.dashboard.patient.saveSettings();
            alsglance.dashboard.patient.loadFacts();
        });
        $("#saveEMGOptions").click(function () {
            $('#emgOptions').modal('hide');
            alsglance.dashboard.settings.envelopeWindowSize = parseInt($("#envelopeWindowSize").val());
            alsglance.dashboard.patient.saveSettings();
            alsglance.dashboard.patient.renderEmg();
        });
        $.each($('#muscles .btn'), function (index, value) {
            var keycol = $(value).data('keycol');
            $(value).click(keycol, function () {
                alsglance.dashboard.patient.filterMuscle(keycol);
                dc.redrawAll();
                analytics.logUiEvent("filterMuscle", "Patient", "dashboard");
            });
        });
    },
    showPatientsHelpButton: function () {
        $("#patients_filter").attr("data-position", "bottom");
        $("#patients_filter").attr("data-step", "2");
        $("#patients_filter").attr("data-intro", alsglance.resources.patientsTip2);
        $("#helpPlaceHolder").html('<a href="javascript:void(0);" onclick="javascript:alsglance.presentation.showHelp(\'Patients\');">' + alsglance.resources.help + '</a>');
    },
    showPatientHelpButton: function () {
        $("#helpPlaceHolder").html('<a href="javascript:void(0);" onclick="javascript:alsglance.presentation.showHelp(\'Patient\');">' + alsglance.resources.help + '</a>');
    },
    showHelp: function (category) {
        introJs().start();
        analytics.logUiEvent("showHelp", category, "navbar");
    },
    showLoadingDialog: (function ($) {

        // Creating modal dialog's DOM
        var $dialog = $(
            '<div class="modal" data-backdrop="false" data-keyboard="false" tabindex="-1" role="dialog" aria-hidden="true" style="padding-top:15%; overflow-y:visible;">' +
            '<div class="modal-dialog modal-m">' +
            '<div class="modal-content">' +
                '<div class="modal-header"><h6 style="margin:0;"></h6></div>' +
                '<div class="modal-body">' +
                    '<div class="progress progress-striped active" style="margin-bottom:0; height:16px;"><div class="progress-bar" style="width: 100%"></div></div>' +
                '</div>' +
            '</div></div></div>');

        return {
            /**
             * Opens our dialog
             * @param message Custom message
             * @param options Custom options:
             * 				  options.dialogSize - bootstrap postfix for dialog size, e.g. "sm", "m";
             * 				  options.progressType - bootstrap postfix for progress bar type, e.g. "success", "warning".
             */
            show: function (message, options) {
                // Assigning defaults
                var settings = $.extend({
                    dialogSize: 'm',
                    progressType: ''
                }, options);
                if (typeof message === 'undefined') {
                    message = 'Loading';
                }
                if (typeof options === 'undefined') {
                    options = {};
                }
                // Configuring dialog
                $dialog.find('.modal-dialog').attr('class', 'modal-dialog').addClass('modal-' + settings.dialogSize);
                $dialog.find('.progress-bar').attr('class', 'progress-bar');
                if (settings.progressType) {
                    $dialog.find('.progress-bar').addClass('progress-bar-' + settings.progressType);
                }
                $dialog.find('h6').html(alsglance.resources.loadingMessage + '<br/><br/><b>' + message + '</b>');
                // Opening dialog
                $dialog.modal();
                analytics.logUiEvent("viewResume", "Patient", "dashboard");
            },
            /**
             * Closes dialog
             */
            hide: function () {
                $dialog.modal('hide');
            }
        };

    })(jQuery),
};
alsglance.dashboard = alsglance.dashboard || {};
alsglance.dashboard.patients = alsglance.dashboard.patients || {
    loadFacts: function (ageMin, ageMax) {
        $.when(alsglance.apiClient.get("DimPatients?$select=Keycol,PatientId,Birthdate,Diagnosedon,Name,Gender"))
        .then(function (data) {
            alsglance.dashboard.patients.load(data, ageMin, ageMax);
            alsglance.dashboard.patients.dataTable = $('#patients').dataTable({
                "language": alsglance.resources.dataTables,
                "order": [[3, "asc"]],
                "aaData": alsglance.dashboard.patients.sexDimension.top(Infinity),
                "dom": '<"top"f<"clear">>rt<"col-sm-offset-4"p>',
                "bLengthChange": false,
                "bSort": true,
                "bInfo": false,
                "bAutoWidth": false,
                "bDeferRender": true,
                "bDestroy": true,
                "aoColumns": [
                    { "mData": "PatientId", "sDefaultContent": "" },
                    { "mData": "Birthdate", "sDefaultContent": "" },
                    { "mData": "Diagnosedon", "sDefaultContent": "" },
                    { "mData": "Name", "sDefaultContent": "" },
                    { "mData": "Gender", "sDefaultContent": "" },
                    { "mData": "Resume", "sDefaultContent": "" }
                ]
            });
            alsglance.presentation.showPatientsHelpButton(); //has to be after datatables
            alsglance.charts.setBehaviour();
            alsglance.charts.resizeAll();
            alsglance.charts.aucBubbleChart.render();//to show the transition effect
        });
    },
    load: function (data, min, max) {
        alsglance.charts.aucBubbleChart = alsglance.charts.aucBubbleChart || dc.bubbleChart('#aucBubbleChart');

        var numberFormat = d3.format('.5f');
        data = data.d.results;
        data.forEach(function (d) {
            var date = new Date();
            date.setISO8601(d.Birthdate);
            d.Age = moment().diff(date, 'years');
            d.Birthdate = moment(date).format("MM-DD-YYYY");
            date.setISO8601(d.Diagnosedon);
            d.Diagnosedon = moment(date).format("MM-DD-YYYY");
            d.Resume = '<a id="resume" href="javascript:void(0);" onclick="javascript:alsglance.presentation.showLoadingDialog.show(\'' + d.Name + '\');window.location=\'' + alsglance.resources.patientLink + d.Keycol + '\'" data-step="3" data-intro="' + alsglance.resources.patientsTip3 + '" data-position=\'left\'> <span id="resume" class="fa fa-eye"></span></a>';
        });

        var ndx = crossfilter(data);

        alsglance.dashboard.patients.sexDimension = ndx.dimension(function (d) {
            return d.Gender;
        });
        // maintain running tallies by year as filters are applied or removed
        var ageGroup = alsglance.dashboard.patients.sexDimension.group().reduce(
            /* callback for when data is added to the current filter results */
            function (p, v) {
                ++p.count;
                p.sumAge += v.Age;
                p.avgAge = p.sumAge / p.count;
                return p;
            },
            /* callback for when data is removed from the current filter results */
            function (p, v) {
                --p.count;
                p.sumAge -= v.Age;
                p.avgAge = p.count ? p.sumAge / p.count : 0;
                return p;
            },
            /* initialize p */
            function () {
                return {
                    sumAge: 0,
                    avgAge: 0,
                    count: 0
                };
            }
        );

        alsglance.charts.aucBubbleChart
            .transitionDuration(1500) // (optional) define chart transition duration, :default = 750
            .margins({ top: 10, right: 50, bottom: 40, left: 50 })
            .dimension(alsglance.dashboard.patients.sexDimension)
            .group(ageGroup)
            .colors(['rgb(49,130,189)', 'rgb(247,104,161)']) // (optional) define color function or array for bubbles
            .colorAccessor(function (d) {
                var res = d.key === "M" ? 0 : 1;
                return res;
            })
            .keyAccessor(function (p) {
                return p.value.avgAge;
            })
            .valueAccessor(function (p) {
                return p.value.count;
            })
            .radiusValueAccessor(function (p) {
                return p.value.avgAge;
            })
            .maxBubbleRelativeSize(0.7)
            .x(d3.scale.linear().domain([min, max]))
            .y(d3.scale.linear().domain([-100, 100]))
            .r(d3.scale.linear().domain([0, 4000]))
            .elasticY(true)
            .yAxisPadding(20)
            .xAxisPadding(50)
            .renderHorizontalGridLines(true) // (optional) render horizontal grid lines, :default=false
            .renderVerticalGridLines(true) // (optional) render vertical grid lines, :default=false
            .xAxisLabel(alsglance.resources.patientsXAxisLabel) // (optional) render an axis label below the x axis
            .yAxisLabel(alsglance.resources.patientsYAxisLabel) // (optional) render a vertical axis lable left of the y axis
            .renderLabel(true) // (optional) whether chart should render labels, :default = true
            .label(function (p) {
                return p.key;
            })
            .renderTitle(true) // (optional) whether chart should render titles, :default = false
            .title(function (p) {
                return [
                    p.key,
                    alsglance.resources.patientsYAxisLabel + ': ' + p.value.count,
                    alsglance.resources.patientsXAxisLabel + ': ' + numberFormat(p.value.avgAge)
                ].join('\n');
            }).on("filtered", function () {
                dc.events.trigger(function () {
                    var alldata = alsglance.dashboard.patients.sexDimension.top(Infinity);
                    alsglance.dashboard.patients.dataTable.fnClearTable();
                    alsglance.dashboard.patients.dataTable.fnAddData(alldata);
                    alsglance.dashboard.patients.dataTable.fnDraw();
                });
            });
        //#endregion

        //#### Rendering
        //simply call renderAll() to render all charts on the page
        dc.renderAll();
        $(".loading").remove();

    }
};

alsglance.dashboard.patient = alsglance.dashboard.patient || {
    maxDate: function () {
        return new Date(alsglance.dashboard.patient.yearMax + (alsglance.dashboard.settings.showPredictions ? 1 : 0), 11, 31);
    },
    loadSettings: function (settings) {
        settings = $.cookie("ApplicationSettings");
        settings = settings != null ? $.parseJSON($.parseJSON(settings).Value) : [];
        alsglance.dashboard.settings = alsglance.dashboard.settings || settings;
        alsglance.dashboard.settings.layout = alsglance.dashboard.settings.layout || [];

        if (alsglance.dashboard.settings.envelopeWindowSize == null) {
            alsglance.dashboard.settings.showPredictions = alsglance.dashboard.settings.showFailureThreshold = true;
            alsglance.dashboard.settings.atThreshold = alsglance.dashboard.settings.fcrThreshold = 18;
            alsglance.dashboard.settings.scmThreshold = 13;
            alsglance.dashboard.settings.envelopeWindowSize = 15;
        }
        $('#showPredictions').prop('checked', alsglance.dashboard.settings.showPredictions);
        $('#showFailureThresHold').prop('checked', alsglance.dashboard.settings.showFailureThreshold);
        $("#AT_Threshold").val(alsglance.dashboard.settings.atThreshold);
        $("#FCR_Threshold").val(alsglance.dashboard.settings.fcrThreshold);
        $("#SCM_Threshold").val(alsglance.dashboard.settings.scmThreshold);
        $("#envelopeWindowSize").val(alsglance.dashboard.settings.envelopeWindowSize);
        if (alsglance.dashboard.settings.predictionBackLog == 999)
            $('#all').prop('checked', true);
        else if (alsglance.dashboard.settings.predictionBackLog == 12)
            $('#year').prop('checked', true);
        else {
            alsglance.dashboard.settings.predictionBackLog = 6;
            $('#6months').prop('checked', true);
        }
        alsglance.presentation.arrangePanels(alsglance.dashboard.settings.layout);
    },
    loadFacts: function () {
        //var then = moment();
        //$.when(alsglance.apiClient.get("Fact?$select=AUC&$expand=Time($select=Hour,TimeOfDay),Date($select=Date,Year,MonthName,Quarter),Patient,Muscle($select=Name,Acronym)&$filter=Patient/Keycol eq " + alsglance.dashboard.patient.id))
        $.when(alsglance.apiClient.get("FactEmgs?$expand=DimPatientDetails,DimMuscleDetails,DimDateDetails,DimTimeDetails&$filter=PatientKeycol eq " + alsglance.dashboard.patient.id))
        //$.when(alsglance.apiClient.get("Facts?$filter=PatientId eq " + alsglance.dashboard.patient.id))
            .then(function (data) {
                data = data.d.results;
                data.forEach(function (d) {
                    d.MuscleAbbreviation = d.DimMuscleDetails.Acronym;
                    d.AUC = parseFloat(d.Area);
                    d.DateMonthName = d.DimDateDetails[alsglance.resources.monthNameKey];
                    d.DateYear = d.DimDateDetails.Year;
                    d.PatientName = d.DimPatientDetails.Name;
                    d.TimeHour = d.DimTimeDetails.Hour24;
                    d.DateQuarter = d.DimDateDetails.Quarter;
                    d.MuscleKeycol = d.DimMuscleDetails.Keycol;
                    var date = new Date();
                    date.setISO8601(d.DimDateDetails.DateIso);
                    d.DateDate = date;
                    d.TimeTimeOfDay = d.DimTimeDetails[alsglance.resources.timeOfDayKey];
                });
                data = alsglance.dashboard.patient.addPredictions(data);

                alsglance.dashboard.patient.load(data);
                colorbrewer.showColorSchemeButton(alsglance.dashboard.settings.colorScheme); //has to be called after the charts have been created
                alsglance.charts.setBehaviour(); //has to be called before the filters are applied
                alsglance.charts.resizeAll();
                alsglance.dashboard.patient.reset();
                alsglance.dashboard.patient.applyFilters(alsglance.dashboard.settings["P" + alsglance.dashboard.patient.id]);
            });
    },
    saveSettings: function () {
        var filters = [];
        for (var i = 0; i < dc.chartRegistry.list().length; i++) {
            var chart = dc.chartRegistry.list()[i];
            for (var j = 0; j < chart.filters().length; j++) {
                filters.push({ ChartID: chart.chartID(), Filter: chart.filters()[j] });
            }
        }
        alsglance.dashboard.settings["P" + alsglance.dashboard.patient.id] = filters;
        alsglance.dashboard.settings.layout = alsglance.presentation.panelsPosition();
        alsglance.dashboard.settings.colorScheme = colorbrewer.selectedScheme;
        var entity = {};
        entity.UserId = alsglance.dashboard.userId;
        entity.ApplicationId = alsglance.applicationId;
        entity.Value = JSON.stringify(alsglance.dashboard.settings);
        $.cookie("ApplicationSettings", JSON.stringify(entity));
        toastr.success(alsglance.resources.saveMessage, 'ALS Glance');
    },
    applyFilters: function (filterObjects) {
        if (filterObjects == null || filterObjects.length == 0)
            return;
        var id, filter;
        for (var j = 0; j < filterObjects.length; j++) {
            id = filterObjects[j].ChartID;
            filter = filterObjects[j].Filter;
            if (id == alsglance.charts.muscleChartId)
                alsglance.dashboard.patient.filterMuscle(filter[0]);
            else if (id == 6) { //dateRangeChart must be handled in a different way
                dc.chartRegistry.list()[id - 1].filterAll();
                dc.chartRegistry.list()[id - 1].filter(dc.filters.RangedFilter(moment(filter[0]).valueOf(), moment(filter[1]).valueOf()));
            } else if (id == 3) {
                dc.chartRegistry.list()[id - 1].filterAll();
                dc.chartRegistry.list()[id - 1].filter(dc.filters.RangedFilter(filter[0], filter[1]));
            }

        }
        for (var i = 0; i < filterObjects.length; i++) {
            id = filterObjects[i].ChartID;
            if (id == alsglance.charts.muscleChartId || id == 3 || id == 6) {
            } else {
                filter = filterObjects[i].Filter;
                var chart = dc.chartRegistry.list()[id - 1];
                if (chart == null) {
                    continue;
                }
                chart.filter(filter);
            }

        }
        dc.redrawAll();
    },
    reset: function () {
        alsglance.dashboard.patient.timeOfDay = null;
        alsglance.dashboard.patient.lastUrl = null;
        dc.filterAll();
        alsglance.dashboard.patient.datePicker();
        alsglance.dashboard.patient.filterMuscle("1");
        dc.redrawAll();
        if (alsglance.charts.emgChart != null) {
            alsglance.charts.emgChart.resetZoom();
        }
    },
    filterMuscle: function (keycol) {
        $("#muscles .active").removeClass("active");
        $("#muscles [data-keycol='"+keycol+"']").addClass("active");
        alsglance.charts.muscleChart.filterAll();
        alsglance.charts.muscleChart.filter([keycol]);
    },
    addPredictions: function (data) {
        if (!alsglance.dashboard.settings.showFailureThreshold && !alsglance.dashboard.settings.showPredictions) {
            return data;
        }

        var muscles = [];
        var muscleAcronyms = [];
        var lastDate = moment(data[data.length - 1].DateDate);

        data.forEach(function (entry) {
            if (lastDate.diff(entry.DateDate, 'months') <= alsglance.dashboard.settings.predictionBackLog) {

                if (muscles[entry.MuscleKeycol] == null) {
                    muscles[entry.MuscleKeycol] = [];
                    muscleAcronyms[entry.MuscleKeycol] = entry.DimMuscleDetails.Acronym;
                }
                if (muscles[entry.MuscleKeycol][entry.TimeTimeOfDay] == null)
                    muscles[entry.MuscleKeycol][entry.TimeTimeOfDay] = [];
                muscles[entry.MuscleKeycol][entry.TimeTimeOfDay].push([new Date(entry.DateDate).getTime(), entry.AUC]);
            }
        });
        for (var muscleKeycol in muscles) {
            var auc;
            if (muscleAcronyms[muscleKeycol] == "FCR")
                auc = alsglance.dashboard.settings.fcrThreshold;
            else if (muscleAcronyms[muscleKeycol] == "SCM") {
                auc = alsglance.dashboard.settings.scmThreshold;
            } else {
                auc = alsglance.dashboard.settings.atThreshold;
            }
            for (var timeOfDay in muscles[muscleKeycol]) {
                var measurements = muscles[muscleKeycol][timeOfDay];
                var equation = regression('linear', measurements).equation;
                var startDate = moment(measurements[0][0]);
                var predictionMonths = moment(alsglance.dashboard.patient.maxDate()).diff(startDate, 'months');
                for (var i = 1; i < predictionMonths; i++) {
                    startDate = startDate.add(1, "months");
                    var ticks = startDate.valueOf();
                    var prediction = {
                        DateDate: new Date(moment(startDate.format("YYYY-MM-DD HH:mm")).valueOf()),
                        AUC: equation[0] * ticks + equation[1],
                        DateMonthName: startDate.format("MMMM"),
                        DateYear: parseInt(startDate.format("YYYY")),
                        DateQuarter: startDate.quarter(),
                        PatientName: alsglance.resources.prediction,
                        MuscleAbbreviation: muscleAcronyms[muscleKeycol],
                        MuscleKeycol: muscleKeycol,
                        TimeTimeOfDay: timeOfDay
                    };
                    if (alsglance.dashboard.settings.showFailureThreshold) {
                        var failureThreshold = jQuery.extend({}, prediction);
                        failureThreshold.PatientName = alsglance.resources.muscleFailure;
                        failureThreshold.AUC = auc;
                        data.push(failureThreshold);
                    }
                    if (alsglance.dashboard.settings.showPredictions) {
                        data.push(prediction);
                    }
                }
            };
        };
        return data;
    },
    loadEmg: function () {
        if (alsglance.dashboard.patient.muscle == null) {
            return;
        }
        var timeOfDayFilter = function (timeOfDay) {
            var filter = null;
            for (var i = 0; i < timeOfDay.length; i++) {
                filter = (!filter ? "" : filter + " or ") + "Time/TimeOfDay eq '" + timeOfDay[i] + "'";
            }
            return " and (" + filter + ")";
        };
        //var url = "Facts?$top=1&$select=EMG&$filter=PatientId%20eq%20" + alsglance.dashboard.patient.id + " and EMG ne null " +
        var url = "GetEMGData?PKeycol=" + alsglance.dashboard.patient.id + "&MKeycol=" + $("#muscles .active").data("keycol") +
//        (alsglance.dashboard.patient.timeOfDay != null ? timeOfDayFilter(alsglance.dashboard.patient.timeOfDay) : "") + 
        (alsglance.dashboard.patient.endDate != null ? "&Date='" + alsglance.dashboard.patient.endDate.format('YYYY-MM-DD') + "'" : "");
        if (url == alsglance.dashboard.patient.lastUrl) {
            return;
        }
        alsglance.dashboard.patient.lastUrl = url;
        $.when(alsglance.apiClient.getIgnoringErrors(url))
            .then(function (facts) {
                var value = facts.d.GetEMGData;
                alsglance.charts.emgData = null;
                if (value != null && value.length > 0) {
                    alsglance.charts.emgData = JSON.parse(value);
                }
                alsglance.dashboard.patient.renderEmg();
                $(".loadingEmg").remove();
            });
    },
    toggleEmgEnvelope: function () {
        alsglance.dashboard.settings.envelopeEmg = !alsglance.dashboard.settings.envelopeEmg;
    },
    renderEmg: function () {
        var averageAbs = function (arr, start, end) {
            var sum = 0;
            end = Math.min(end, arr.length);
            for (var i = start; i < end; i++) {
                sum += parseInt(Math.abs(arr[i][1]), 10); //don't forget to add the base
            }
            return sum / (end - start);
        };

        var data = alsglance.charts.emgData;
        if (alsglance.dashboard.settings.envelopeEmg && data != null) {
            var smoothEnvelope = [];
            var size;
            for (var i = 0; i < data.length; i++) {
                size = Math.min(alsglance.dashboard.settings.envelopeWindowSize, data.length - alsglance.dashboard.settings.envelopeWindowSize, Math.abs(alsglance.dashboard.settings.envelopeWindowSize - i));
                smoothEnvelope.push([i, averageAbs(data, i, i + size - 1)]);
            }
            data = smoothEnvelope;
        }

        alsglance.charts.emgChart = new Dygraph(document.getElementById("emgChart"), data, {
            labels: [alsglance.resources.time, 'µV'],
            xlabel: alsglance.resources.time,
            // ylabel: 'EMG',
            legend: 'true',
            colors: [colorbrewer.schemes[colorbrewer.selectedScheme][colorbrewer.numClasses][3]],
            gridLineColor: 'rgb(204, 204, 204)',
            labelsDivStyles: {
                'textAlign': 'right'
            }
            //,showRangeSelector: true
        });
    },
    load: function (data) {
        alsglance.charts.muscleChart = alsglance.charts.muscleChart || dc.pieChart('#muscleChart');
        alsglance.charts.quarterChart = alsglance.charts.quarterChart || dc.pieChart('#quarterChart');
        alsglance.charts.timeHourChart = alsglance.charts.timeHourChart || dc.barChart('#timeHourChart');
        alsglance.charts.timeOfDayChart = alsglance.charts.timeOfDayChart || dc.rowChart('#timeOfDayChart');
        alsglance.charts.aucSeriesChart = alsglance.charts.aucSeriesChart || dc.seriesChart('#predictionSeriesChart');
        alsglance.charts.dateRangeChart = alsglance.charts.dateRangeChart || dc.barChart('#dateRangeChart');

        alsglance.dashboard.patient.datePicker = function () {
            var minDate = moment("01-01-" + alsglance.dashboard.patient.yearMin, "MM-DD-YYYY");
            var maxDate = moment(alsglance.dashboard.patient.maxDate());
            alsglance.dashboard.patient.endDate = maxDate;
            $('#reportrange span').html(minDate.format('MMMM D, YYYY') + ' - ' + maxDate.format('MMMM D, YYYY'));
            $('#reportrange').daterangepicker({
                format: 'MM/DD/YYYY',
                startDate: minDate,
                endDate: moment(),
                minDate: minDate,
                maxDate: maxDate,
                showDropdowns: true,
                showWeekNumbers: false,
                timePicker: false,
                timePickerIncrement: 1,
                timePicker12Hour: true,
                ranges: {
                    'Last 30 Days': [moment().subtract(29, 'days'), moment()],
                    'This Month': [moment().startOf('month'), moment().endOf('month')],
                    'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
                    'Last Year': [moment().subtract(1, 'year'), moment()]
                },
                opens: 'left',
                drops: 'down',
                buttonClasses: ['btn', 'btn-sm'],
                applyClass: 'btn-primary',
                cancelClass: 'btn-default',
                separator: ' to ',
                locale: {
                    applyLabel: 'Submit',
                    cancelLabel: 'Cancel',
                    fromLabel: 'From',
                    toLabel: 'To',
                    customRangeLabel: 'Custom',
                    daysOfWeek: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
                    monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                    firstDay: 1
                }
            }, function (start, end, label) {

                $('#reportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
                alsglance.charts.dateRangeChart.filterAll();
                alsglance.charts.dateRangeChart.filter(dc.filters.RangedFilter(start.valueOf(), end.valueOf()));
                dc.redrawAll();
                analytics.logUiEvent("filterDates", "Patient", "dashboard");
            });
        };

        /* since its a csv file we need to format the data a bit */
        var dateFormat = d3.time.format('%Y/%m/%d');
        var hourFormat = d3.format('.0f');

        data.forEach(function (d) {
            d.DateMonthInYear = d3.time.month(d.DateDate); // pre-calculate month for better performance
        });        //### Create Crossfilter Dimensions and Groups
        var ndx = crossfilter(data);
        var all = ndx.groupAll();

        // dimension by full date
        var dateDimension = ndx.dimension(function (d) {
            return d.DateDate;
        });

        // dimension by month
        var dateMonthInYearDimension = ndx.dimension(function (d) {
            return d.DateMonthInYear;
        });

        var monthGroup = dateMonthInYearDimension.group().reduceSum(function (d) {
            return d.AUC;
        });

        //#region Muscle

        var muscleDimension = ndx.dimension(function (d) {
            return d.MuscleKeycol;
        });
        // produce counts records in the dimension
        var muscleGroup = muscleDimension.group().reduceCount();


        alsglance.charts.muscleChart
            .dimension(muscleDimension) // set dimension
            .group(muscleGroup)
            .on("filtered", function (chart) {
                var filters = chart.filters();
                if (filters.length > 0) {
                    alsglance.dashboard.patient.muscle = filters[0];
                    alsglance.dashboard.patient.loadEmg();
                }
            });
        //#endregion


        var timeHourDimension = ndx.dimension(function (d) {
            return d.TimeHour;
        });

        var timeHourGroup = timeHourDimension.group();

        var timeOfDayDimension = ndx.dimension(function (d) {
            return d.TimeTimeOfDay;
        });
        var timeOfDayGroup = timeOfDayDimension.group();


        //#region Quarter Chart

        var quarter = ndx.dimension(function (d) {
            return alsglance.resources.quarterPrefix + d.DateQuarter;
        });
        var quarterGroup = quarter.group();

        alsglance.charts.quarterChart
            .radius(90)
            .innerRadius(50)
            .dimension(quarter)
            .group(quarterGroup);

        //#endregion

        //#### Row Chart
        alsglance.charts.timeOfDayChart
            .group(timeOfDayGroup)
            .dimension(timeOfDayDimension)
            .label(function (d) {
                return d.key;
            })
            .on("renderlet.axis", function (chart) {
                alsglance.charts.addXAxis(chart, alsglance.resources.measurements);
            })
            .on("filtered", function (chart) {
                var filters = chart.filters();
                if (filters.length > 0) {
                    alsglance.dashboard.patient.timeOfDay = filters;
                } else {
                    alsglance.dashboard.patient.timeOfDay = null;
                }
                alsglance.dashboard.patient.loadEmg();
            })
            .elasticX(true)
            .xAxis().ticks(4);

        alsglance.charts.timeHourChart
           .dimension(timeHourDimension)
           .group(timeHourGroup)
           .elasticY(true)
           // (optional) whether bar should be center to its x value. Not needed for ordinal chart, :default=false
           .centerBar(true)
           // (optional) set gap between bars manually in px, :default=2
           .gap(2)
           // (optional) set filter brush rounding
           .round(dc.round.floor)
           .alwaysUseRounding(true)
           .x(d3.scale.linear().domain([0, 23]))
           .yAxisLabel(alsglance.resources.measurements)
           .renderHorizontalGridLines(true)
           .on("renderlet.axis", function (chart) {
               alsglance.charts.removeOverlapedAxisTicks($("#timeHourChart .axis.x").find(".tick"));
           }) // customize the filter displayed in the control span
           .filterPrinter(function (filters) {
               var filter = filters[0], s = '';
               s += hourFormat(filter[0]) + 'h -> ' + hourFormat(filter[1]) + 'h';
               return s;
           });


        // Customize axis
        alsglance.charts.timeHourChart.xAxis().tickFormat(
            function (v) { return v + 'h'; });
        alsglance.charts.timeHourChart.yAxis().ticks(6);


        //#region Prediction Chart
        var predictionDimension = ndx.dimension(function (d) {
            return [d.PatientName, d.DateDate, d.MuscleAbbreviation, d.TimeTimeOfDay];
        });

        var predictionGroup = predictionDimension.group().reduceSum(function (d) {
            return +d.AUC;
        });
        var localeFormatter = d3.locale({
            "decimal": ",",
            "thousands": ".",
            "grouping": [3],
            "currency": ["€", ""],
            "dateTime": "%a %b %e %X %Y",
            "date": "%d-%m-%Y",
            "time": "%H:%M:%S",
            "periods": ["AM", "PM"],
            "days": ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            "shortDays": alsglance.resources.shortDays,
            "months": alsglance.resources.months,
            "shortMonths": alsglance.resources.shortMonths
        });

        var tickFormat = localeFormatter.timeFormat.multi([
            ["%H:%M", function (d) { return d.getMinutes(); }],
            ["%H:%M", function (d) { return d.getHours(); }],
            ["%a %d", function (d) { return d.getDay() && d.getDate() != 1; }],
            ["%b %d", function (d) { return d.getDate() != 1; }],
            ["%B", function (d) { return d.getMonth(); }],
            ["%Y", function () { return true; }]
        ]);
        alsglance.charts.aucSeriesChart
               .margins({ top: 20, right: 30, bottom: 20, left: 60 })
            //.height(160)
            //.chart(function(c) { return dc.lineChart(c).interpolate('basis'); })
            .x(d3.time.scale().domain([new Date(alsglance.dashboard.patient.yearMin, 0, 1), alsglance.dashboard.patient.maxDate()]))
            .y(d3.scale.linear().domain([9, 40]))
            .brushOn(false)
            //.yAxisLabel("")
            //.xAxisLabel("Date")
            //.clipPadding(10)
            // .elasticY(true)
            .dimension(predictionDimension)
            .group(alsglance.charts.removeInvalidBins(predictionGroup))
            .rangeChart(alsglance.charts.dateRangeChart)
            .seriesAccessor(function (d) {
                return d.key[0];
            })
            .keyAccessor(function (d) {
                return d.key[1];
            })
            .valueAccessor(function (d) {
                return +d.value;
            })
            .legend(dc.legend().x(80).y(10).itemHeight(13).gap(5).legendWidth(170).itemWidth(170)).title(function (d) {
                return dateFormat(d.key[1]) + ':\n' + d.value;
            }).on("renderlet.axis", function (chart) {
                alsglance.charts.removeOverlapedAxisTicks($("#predictionSeriesChart .axis.x").find(".tick"));
            });
        alsglance.charts.aucSeriesChart.xAxis().tickFormat(tickFormat);

        alsglance.charts.dateRangeChart
            .height(50)
            .mouseZoomable(true)
            .margins({ top: 0, right: 50, bottom: 20, left: 60 })
            .dimension(dateMonthInYearDimension)
            .group(alsglance.charts.removeInvalidBins(monthGroup))
            .centerBar(true)
            .gap(1)
            .x(d3.time.scale().domain([new Date(alsglance.dashboard.patient.yearMin, 0, 1), alsglance.dashboard.patient.maxDate()]))
            .elasticY(true)
            .round(d3.time.month.round)
            .alwaysUseRounding(true)
            .xUnits(d3.time.months)
            .on("renderlet.axis", function (chart) {
                alsglance.charts.removeOverlapedAxisTicks($("#dateRangeChart .axis.x").find(".tick"));
                $("#dateRangeChart").height(50);
            })
            .on("filtered", function (chart) {

                var filters = chart.filters();
                if (filters.length > 0) {
                    var range = filters[0];
                    alsglance.dashboard.patient.endDate = moment(range[1]);
                    $('#reportrange span').html(moment(range[0]).format('MMMM D, YYYY') + ' - ' + alsglance.dashboard.patient.endDate.format('MMMM D, YYYY'));
                } else {
                    alsglance.dashboard.patient.endDate = moment(alsglance.dashboard.patient.maxDate());
                }
                alsglance.dashboard.patient.loadEmg();
            });
        alsglance.charts.dateRangeChart.xAxis().tickFormat(tickFormat);

        //#endregion


        //#region DataTable
        /*
        //#### Data Count
        // Create a data count widget and use the given css selector as anchor. You can also specify
        // an optional chart group for this chart to be scoped within. When a chart belongs
        // to a specific group then any interaction with such chart will only trigger redraw
        // on other charts within the same chart group.
        <div id='data-count'>
            <span class='filter-count'></span> selected out of <span class='total-count'></span> records
        </div>
        */
        dc.dataCount('#dc-data-count')
            .dimension(ndx)
            .group(all)
            // (optional) html, for setting different html for some records and all records.
            // .html replaces everything in the anchor with the html given using the following function.
            // %filter-count and %total-count are replaced with the values obtained.
            .html({
                some: alsglance.resources.someSelectedMessage,
                all: alsglance.resources.allSelectedMessage
            });

        dc.dataTable('#dc-data-table')
            .dimension(dateDimension)
            // data table does not use crossfilter group but rather a closure
            // as a grouping function
            .group(function (d) {
                return d.DateYear + '/' + d.DateMonthName;
            })
            .size(100) // (optional) max number of records to be shown, :default = 25
            // There are several ways to specify the columns; see the data-table documentation.
            // This code demonstrates generating the column header automatically based on the columns.
            .columns([
                {
                    label: alsglance.resources.date,
                    format: function (d) {
                        return moment(d.DateDate).format("YYYY-MM-DD");
                    }
                },
                {
                    label: alsglance.resources.name,
                    format: function (d) {
                        return d.PatientName;
                    }
                },
                {
                    label: alsglance.resources.timeOfDay,
                    format: function (d) {
                        return d.TimeTimeOfDay;
                    }
                },
                {
                    label: alsglance.resources.hour,
                    format: function (d) {
                        return d.TimeHour;
                    }
                },
                {
                    label: alsglance.resources.muscle,
                    format: function (d) {
                        return d.MuscleAbbreviation;
                    }
                },
                'AUC' // d['volume'], ie, a field accessor; capitalized automatically
            ])

            // (optional) sort using the given field, :default = function(d){return d;}
            .sortBy(function (d) {
                return d.DateDate;
            });
        // (optional) sort order, :default ascending
        //.order(d3.ascending);
        // (optional) custom renderlet to post-process chart using D3
        // .on("renderlet.post-process", function (table) {
        //table.selectAll('.dc-table-group ').classed('info', true);
        //  });

        //#endregion

        //#### Rendering
        //simply call renderAll() to render all charts on the page
        dc.renderAll();
        $(".loading").remove();

    }
};
$(function () {
    // Only enable if the document has a long scroll bar
    // Note the window height + offset
    if (($(window).height() + 100) < $(document).height()) {
        $('#top-link-block').removeClass('hidden').affix({
            // how far to scroll down before link "slides" into view
            offset: { top: 100 }
        });
    }
    $('#version').text("(crossfilter: " + crossfilter.version + ", d3: " + d3.version + ", dc: " + dc.version + (window.Dygraph != null ? ", dygraph: " + Dygraph.VERSION : "") + ", moment: " + moment.version + ")");
});



//required for IE and FireFox
Date.prototype.setISO8601 = function (jsonDate) {
    var offset = new Date().getTimezoneOffset();
    var parts = /\/Date\((-?\d+)([+-]\d{2})?(\d{2})?.*/.exec(jsonDate);

    if (parts[2] == undefined)
        parts[2] = 0;

    if (parts[3] == undefined)
        parts[3] = 0;

    this.setTime(+parts[1] + offset + parts[2] * 3600000 + parts[3] * 60000);
}