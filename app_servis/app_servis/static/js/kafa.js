
var id = null;

window.addEventListener("load", async function(){
    var url = new URL( window.location.href );
    id = url.searchParams.get("id");

    fetch('http://localhost:9000/kategorija/')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            data.forEach(item => {
                const option = document.createElement("option");
                option.value = item.id;
                option.textContent = item.naziv;
                document.getElementById("kategorija").appendChild(option);
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });

    fetch("http://localhost:9000/kafa/" + id).then( resp=>resp.json() )
        .then( data=>{
            document.getElementById("naziv").value = data.naziv;
            // document.getElementById("kategorija").value = data.kategorija_id;
            document.getElementById("opis").value = data.opis;
            document.getElementById("cena").value = data.cena;

            var categorySelect = document.getElementById("kategorija");
            Array.from(categorySelect.options).forEach(option => {
                if (option.textContent === data.kategorija.naziv) {
                    option.selected = true;
                }
            });
        })
        .catch(err=>console.log(err));

    await fetch('http://localhost:9000/dodatak/')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {

            const emptyOption = document.createElement("option");
            emptyOption.value = "";
            emptyOption.textContent = "Izaberite dodatak";
            document.getElementById("spisak-dodataka").appendChild(emptyOption);
            emptyOption.selected = true;

            data.forEach(item => {
                const option = document.createElement("option");
                option.value = item.id;
                option.textContent = item.naziv;
                document.getElementById("spisak-dodataka").appendChild(option);
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });

    fetch('http://localhost:9000/kafaDodatak/')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }
            return response.json();
        })
        .then(stavke => {
             stavke.filter(stavka => stavka.kafa_id == id)
                .map(stavka => dodajDodatak(stavka.dodatak_id));
        });

    document.getElementById("forma").addEventListener("submit", function(event){
        var validno = true;
        if(document.getElementById("naziv").value.length < 3){
            validno = false;
            document.getElementById("naziv").classList.add("error");
            document.getElementById("naziv").classList.remove("success");
            var spanovi = document.querySelectorAll("#sastojci > span.badge");
            var niz = [];
            for(let i=0; i<spanovi.length; i++){
                niz.push(spanovi[i].dataset.id);
            }
            document.getElementById('dodaci-input').value = JSON.stringify(niz);
        }
        else{
            document.getElementById("naziv").classList.add("success");
            document.getElementById("naziv").classList.remove("error");

        }
        if(!validno)
            event.preventDefault();
        else{
            event.preventDefault();
            var novaKafa = {};
            novaKafa.naziv = document.getElementById("naziv").value;
            novaKafa.opis = document.getElementById("opis").value;
            novaKafa.kategorija_id = document.getElementById("kategorija").value;
            novaKafa.cena = document.getElementById("cena").value;

            fetch("http://localhost:9000/kafa/"+ id, {
                method:"PUT",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(novaKafa)
            })
                .then(succ=>succ.json())
                .then(data=>{
                    window.location.href=`/kafe.html`;
                })
                .catch(err => console.log(err));

            fetch('http://localhost:9000/kafaDodatak/')
                .then(response => response.json())
                .then(allDodaci => {
                    // Filter to get only those dodaci that belong to the current kafa
                    const currentDodaci = allDodaci.filter(d => d.kafa_id == id);

                    // Get the IDs of currently selected dodaci
                    const selectedDodaciIds = Array.from(document.getElementById("izabrani-dodaci").children)
                        .map(span => span.dataset.id);

                    // Determine which dodaci to add and which to delete
                    const dodaciToAdd = selectedDodaciIds.filter(id => !currentDodaci.some(d => d.dodatak_id == id));
                    const dodaciToDelete = currentDodaci.filter(d => !selectedDodaciIds.includes(d.dodatak_id.toString()));

                    // Make API calls to add new dodaci and delete removed ones
                    const addPromises = dodaciToAdd.map(dodatak_id =>
                        fetch('http://localhost:9000/kafaDodatak/', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ kafa_id: id, dodatak_id: dodatak_id })
                        })
                    );

                    const deletePromises = dodaciToDelete.map(d =>
                        fetch(`http://localhost:9000/kafaDodatak/${d.kafa_id}/${d.dodatak_id}`, { method: 'DELETE' })
                    );

                    return Promise.all([...addPromises, ...deletePromises]);
                })
                .then(() => {
                    window.location.href = '/kafe.html';
                })
                .catch(error => console.error('Error:', error));
        }
    });

    document.getElementById("naziv").addEventListener("keydown", function (){
        this.classList.remove('success');
        this.classList.remove('error')
    })
    document.getElementById("dodaj-dodatak").addEventListener("click", function(){
        var id = document.getElementById("spisak-dodataka").value;
        if(!id){
            alert("Izaberi sastojak");
            return;
        }
        dodajDodatak(id);
    });
    document.getElementById("obrisi").addEventListener("click", function () {
        if( confirm("Potvrdi brisanje") ){
            fetch("http://localhost:9000/kafa/"+id, { method:"DELETE" })
                .then( resp=>resp.json()).then(data=>{
                alert("Obrisan je zapis "+data);
                window.location.href("/kafa.html");
            })
                .catch( err=>console.log(err));

        } else {
            return;
        }
    })
});

function dodajDodatak(id) {
    id = id.toString();
    document.querySelector(`#spisak-dodataka > option[value='${id}']`).disabled = true;
    document.getElementById("spisak-dodataka").selectedIndex = 0;
    var naziv = document.querySelector(`#spisak-dodataka > option[value='${id}']`).innerHTML;
    var span = document.createElement("span");
    span.classList.add("badge");
    span.classList.add("bg-secondary");
    span.dataset.id = id;
    span.innerHTML = naziv;
    var button = document.createElement("button");
    button.type="button";
    button.classList.add("btn");
    button.classList.add("btn-default");
    button.classList.add("btn-sm");
    button.innerHTML = "X";
    span.appendChild(button);
    document.getElementById("izabrani-dodaci").appendChild(span);
    document.getElementById("izabrani-dodaci").appendChild(document.createTextNode(" "))
    button.addEventListener("click", function(){
        var id = this.parentNode.dataset.id;
        this.parentNode.parentNode.removeChild( this.parentNode );
        document.querySelector(`#spisak-dodataka > option[value='${id}']`).disabled = false;
    });
};

