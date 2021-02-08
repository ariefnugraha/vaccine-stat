$(document).ready(function () {
    //GET VACCINATION DATA

    
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

            //GET LATEST DATA
            let getLatestData = allRows[allRows.length - 2];
            let splitLatestData = getLatestData.split(",");

           // let latestDate = new Date(splitLatestData[1]); //GET DATE;
           // let formatLatestDate = latestDate.toString().substring(4, 15);
            let latest_total_vaccine_one = parseInt(splitLatestData[5]) //GET AMOUNT OF PEOPLE WHO GET FIRST VACCINATION;
            let latest_total_vaccine_two = splitLatestData[6] //GET AMOUNT OF PEOPLE WHO GET SECOND VACCINATION;

            latest_total_vaccine_two === "" ? latest_total_vaccine_two = 0 : latest_total_vaccine_two = parseInt(latest_total_vaccine_two);

            let latestTotal = latest_total_vaccine_one + latest_total_vaccine_two;

            //GET DATA ONE DAY BEFORE LATEST UPDATE
            let pastData = allRows[allRows.length - 3];
            let splitPastData = pastData.split(",");

            let past_total_vaccine = splitPastData[4];
            let past_first_vaccine = splitPastData[5];
            let past_second_vaccine = splitPastData[6];

            let diffrent_total_vaccine_today_yesterday = parseInt(latestTotal) - parseInt(past_total_vaccine);
            let diffrent_one_vaccine_today_yesterday = parseInt(latest_total_vaccine_one) - parseInt(past_first_vaccine);
            let diffrent_second_vaccine_today_yesterday = parseInt(latest_total_vaccine_two - past_second_vaccine);

            //SHOWING DATA FOR TABLE
            /*
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
            */
            //POPULATE DATA TO NEW ARRAY FOR CHART DATA
            /*
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
          
            */
            //$("tbody").append(table);
            //$(".date").html(formatLatestDate);
            $(".increment-one").html("+ " + diffrent_one_vaccine_today_yesterday.toLocaleString("id-Id"));
            $(".increment-two").html("+ " + diffrent_second_vaccine_today_yesterday.toLocaleString("id-Id"));
            $(".increment-total").html("+ " + diffrent_total_vaccine_today_yesterday.toLocaleString("id-Id"))
            //$(".table").DataTable();


            //FOR MAKE CHART
            /*
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
            */
            
        }
    })


    $.ajax({
        url: "https://covid.ourworldindata.org/data/latest/owid-covid-latest.json",
        success: function (data) {
            let getData = data.IDN;
            let date = new Date(getData.last_updated_date);
            let formatDate = date.toString().substring(4, 15);

            let totalVaccine = getData.total_vaccinations;
            let oneVaccine = getData.people_vaccinated;
            let twoVaccine = getData.people_fully_vaccinated;
            let totalCases = getData.total_cases;
            let totalDeath = getData.total_deaths;
            let totalTests = getData.total_tests;

            let newCases = getData.new_cases;
            let newDeaths = getData.new_deaths;
            let newTest = getData.new_tests;

            $(".date").html(formatDate);
            $(".one-vaccine").html(oneVaccine.toLocaleString("id-Id"));
            $(".two-vaccine").html(twoVaccine.toLocaleString("id-Id"));
            $(".total-vaccine").html(totalVaccine.toLocaleString("id-Id"));

            $(".confirm-case").html(totalCases.toLocaleString("id-Id"));
            $(".increment-confirm-case").html("+ " + newCases.toLocaleString("id-Id"));
            $(".death").html(totalDeath.toLocaleString("id-Id"))
            $(".increment-death").html("+ " + newDeaths.toLocaleString("id-Id"));
            $(".test").html(totalTests.toLocaleString("id-Id"));
            $(".increment-test").html("+ " + newTest.toLocaleString("id-Id"));
        }
    })

    $.ajax({
        url: 'https://covid19.mathdro.id/api/countries/indonesia',
        success: function (data) {

            let totalCase = data.confirmed.value;
            let deathCase = data.deaths.value;
            let recoverCase = data.recovered.value;
            let activeCase = totalCase - (deathCase + recoverCase);

            $(".recovered").html(recoverCase.toLocaleString("id-Id"));
            $(".death").html(deathCase.toLocaleString("id-Id"));
            $(".active-case").html(activeCase.toLocaleString("id-Id"));
        }
    })
})