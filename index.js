import express from "express";

const app = express();

const holidays = [
    { date: "1/1/2022", name: "Confraternização mundial" },
    { date: "1/3/2022", name: "Carnaval" },
    { date: "4/17/2022", name: "Páscoa" },
    { date: "4/21/2022", name: "Tiradentes" },
    { date: "5/1/2022", name: "Dia do trabalho" },
    { date: "6/16/2022", name: "Corpus Christi" },
    { date: "9/7/2022", name: "Independência do Brasil" },
    { date: "10/12/2022", name: "Nossa Senhora Aparecida" },
    { date: "11/2/2022", name: "Finados" },
    { date: "11/15/2022", name: "Proclamação da República" },
    { date: "12/25/2022", name: "Natal" },
];

const compareDates = (date1, date2) => {
    return date1.toLocaleDateString() == date2.toLocaleDateString();
};

app.get("/holidays", (req, res) => {
    res.send(holidays);
});

app.get("/is-today-holiday", (req, res) => {
    let today = new Date();

    for (const day of holidays) {
        let date = new Date(day.date);
        if (compareDates(today, date)) {
            res.send("Sim, hoje é " + day.name);
            return;
        }
    }
    res.send("hoje não é feriado");
});

app.get("/holiday/:month", (req, res) => {
    const month = req.params.month - 1;
    const days = [];
    for (const holiday of holidays) {
        let date = new Date(holiday.date);
        if (month == date.getMonth()) {
            days.push(holiday);
        }
    }
    res.send(days);
});

console.log("Aberto na porta 4000");
app.listen(4000);
