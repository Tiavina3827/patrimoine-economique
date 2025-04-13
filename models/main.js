// 1. Définir les biens
//2. réduire la valeur de ces biens et de son argent
//3. Donnés le reste en tant que patrimoine
 class biens{
    constructor(value,devaluePercentPerYear,time) {
        this.value = value;
        this.devaluePercentPerYear = devaluePercentPerYear;
        this.time = time;
    }
    dateActuelle= new Date();
     getValue(){
        return(value-((this.devaluePercentPerYear*(dateActuelle.getFullYear())-this.time)/100)) ;
     }
}
class CurrentAccount{
    constructor(montant,date,lifeStyle,addPerMonth){
        this.montant = montant;
        this.date = date;
        this.lifeStyle = lifeStyle;
    }
    //
    actualMonth = new Date().getMonth();
    brutMoney(){
        return (this.montant);
    }
    Devaluation(){
        return (this.lifeStyle*this.actualMonth);
    }
    ActualMoney(){
        let brut = this.brutMoney();
        let deval= this.Devaluation();
        return (brut-deval);
    }

}
let dateDeDebut = new Date(2024,5,13)
let IloCC = new CurrentAccount(600000,dateDeDebut,500000,1000000);

class SavingAccount{
    constructor(montant){
        this.montant = montant;
    }
}

function Patrimoine(utilisateur,argent,biens,dateDeVerification) {
//argent[ActuallMoney,montant,argentEnPossession]


}
console.log(IloCC.ActualMoney());