$(document).ready(function () {

    $.ajax({
        url: "https://covid.ourworldindata.org/data/vaccinations/country_data/Indonesia.csv",
        success: function (data) {
            let table;
            const chart = $("#chart");
            let allDate = [];
            let totalVaccinations = [];
            let oneVaccines = [];
            let twoVaccines = [];

            let allRows = data.split(/\r?\n|\r/);
            let getLatestData = allRows[allRows.length - 2];
            let splitLatestData = getLatestData.split(",");

            let latestDate = new Date(splitLatestData[1]); //GET DATE;
            let formatLatestDate = latestDate.toString().substring(0, 15);
            let latest_total_vaccine_one = parseInt(splitLatestData[5]) //GET AMOUNT OF PEOPLE WHO GET FIRST VACCINATION;
            let latest_total_vaccine_two = splitLatestData[6] //GET AMOUNT OF PEOPLE WHO GET SECOND VACCINATION;

            latest_total_vaccine_two === "" ? latest_total_vaccine_two = 0 : latest_total_vaccine_two = parseInt(latest_total_vaccine_two);

            let latestTotal = latest_total_vaccine_one + latest_total_vaccine_two;

            //SHOWING DATA FOR TABLE
            for (let singleRow = allRows.length - 2; singleRow > 0; singleRow--) {

                table += '<tr>'
                let rowCells = allRows[singleRow].split(",");
                rowCells.splice(0, 1);
                rowCells.splice(1, 2);

                let date = new Date(rowCells[0]);
                let formatDate = date.toString().substring(0, 15);

                let totalVaccination = rowCells[1];
                let oneVaccine = rowCells[2];
                let twoVaccine = rowCells[3];

                table += '<td>';
                table += formatDate;
                table += '</td>';

                table += '<td>';
                table += totalVaccination;
                table += '</td>';

                table += '<td>';
                table += oneVaccine;
                table += '</td>'

                table += '<td>';
                table += twoVaccine;
                table += '</td>'

                table += '</tr>';
            }

            //POPULATE DATA TO NEW ARRAY FOR CHART DATA
            for (let singleRow = 1; singleRow < allRows.length - 1; singleRow++) {
                let rowCells = allRows[singleRow].split(",");
                rowCells.splice(0, 1);
                rowCells.splice(1, 2);

                let date = new Date(rowCells[0]);
                let formatDate = date.toString().substring(0, 15);
                allDate.push(formatDate);
                totalVaccinations.push(rowCells[1]);
                oneVaccines.push(rowCells[2]);
                twoVaccines.push(rowCells[3]);
            }

            $("tbody").append(table);
            $(".date").html(formatLatestDate)
            $(".one-vaccine").html(latest_total_vaccine_one);
            $(".two-vaccine").html(latest_total_vaccine_two);
            $(".total-today").html(latestTotal)
            $(".table").DataTable();

            let makeChart = new Chart(chart, {
                type: 'line',
                data: {
                    labels: allDate,
                    datasets: [
                        {
                            label: 'Total Orang Sekali Divaksin',
                            data: oneVaccines,
                            pointBackgroundColor: 'rgba(82, 183, 136,1)',
                            pointRadius: '4',
                            backgroundColor: 'rgba(82, 183, 136, 0)',
                            borderColor: 'rgba(82, 183, 136, 1)',
                            borderWidth: 2
                        }, {
                            label: 'Total Orang Dua Kali Divaksin',
                            data: twoVaccines,
                            pointBackgroundColor: 'rgba(113, 97, 239,1)',
                            pointRadius: '4',
                            backgroundColor: 'rgba(113, 97, 239, 0)',
                            borderColor: 'rgba(113, 97, 239, 1)',
                            borderWidth: 2
                        }

                    ]
                },
            })
        }
    })


})