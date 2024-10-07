import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {
  titulo: string = "";
  texto: string = "";

  constructor(private bd: ServicebdService, private router: Router) { }

  ngOnInit() {
  }

  agregar(){
    this.bd.insertarNoticia(this.titulo, this.texto);
  }

}
