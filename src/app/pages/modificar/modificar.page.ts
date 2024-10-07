import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-modificar',
  templateUrl: './modificar.page.html',
  styleUrls: ['./modificar.page.scss'],
})
export class ModificarPage implements OnInit {
  noticiaRecibida: any;

  constructor(private bd: ServicebdService, private router: Router, private activedroute: ActivatedRoute) {
    this.activedroute.queryParams.subscribe(res=>{
      if(this.router.getCurrentNavigation()?.extras.state){
        this.noticiaRecibida = this.router.getCurrentNavigation()?.extras?.state?.['noticiaEnviada'];
      }
    })
   }

  ngOnInit() {
  }

  modificar(){
    this.bd.modificarNoticia(this.noticiaRecibida.idnoticia,this.noticiaRecibida.titulo,this.noticiaRecibida.texto);
  }

}
