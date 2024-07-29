
var id = null;

window.addEventListener("load", function() {

    var url = new URL( window.location.href );
    id = url.searchParams.get("id");

    fetch("http://localhost:9000/dodatak/" + id).then( resp=>resp.json() )
        .then( data=>{
            document.getElementById("naziv").value = data.naziv;
        })
        .catch(err=>console.log(err));

    document.getElementById("forma").addEventListener("submit", function(event){
        event.preventDefault();
        var validno = validacija();
        if(!validno){ return; }

        var kategorija = {};
        kategorija.naziv = document.getElementById("naziv").value;

        fetch("http://localhost:9000/dodatak/"+ id, {
            method:"PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(kategorija)
        })
            .then(succ=>succ.json())
            .then(data=>{
                window.location.href=`/dodaci.html`;
            })
            .catch(err => console.log(err));
    });

    document.getElementById("obrisi").addEventListener("click", function () {
        if( confirm("Potvrdi brisanje") ){
            fetch("http://localhost:9000/dodatak/"+id, { method:"DELETE" })
                .then( resp=>resp.json()).then(data=>{
                alert("Obrisan je zapis "+data);
                window.location.href("/dodatak.html");
            })
                .catch( err=>console.log(err));

        } else {
            return;
        }
    })
});

function validacija(){
    var validno = true;
    if(document.getElementById("naziv").value.length < 3){
        validno = false;
        document.getElementById("naziv").classList.add("error");
        document.getElementById("naziv").classList.remove("success");
    }
    else{
        document.getElementById("naziv").classList.add("success");
        document.getElementById("naziv").classList.remove("error");
    }
    return validno;
}