<?php

namespace Poyecto\ProyectoBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Poyecto\ProyectoBundle\Entity\NotaVenta1;
use Poyecto\ProyectoBundle\Entity\DetalleProducto1;

class DefaultController extends Controller
{

    public function indexAction()
    {
    	return $this->render('PoyectoProyectoBundle:Default:index.html.twig');
    }

     public function facturasComprasAction()
    {
       $repository = $this->getDoctrine()->getRepository("PoyectoProyectoBundle:Producto");
       $docu =   $repository->createQueryBuilder('p')
            ->select('p, MAX(p.id) AS max_score')
            ->getQuery();
       $document = $docu ->getResult();
       $numeroFactura =$document[0]["max_score"]+1; 
       // echo'<pre>';var_dump($numeroFactura);exit;
       $arrayMeses = array('Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
       'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre');
       $arrayDias = array( 'Domingo', 'Lunes', 'Martes',
       'Miercoles', 'Jueves', 'Viernes', 'Sabado');     
        $fechaEmision = $arrayDias[date('w')].", ".date('d')." de ".$arrayMeses[date('m')-1]." de ".date('Y');
    	return $this->render('PoyectoProyectoBundle:Default:facturasCompras.html.twig', array('fechaEmision' => $fechaEmision));
    }

     public function facturasVentasAction()
    {     
        $arrayMeses = array('Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre');
        $arrayDias = array( 'Domingo', 'Lunes', 'Martes',
        'Miercoles', 'Jueves', 'Viernes', 'Sabado');     
        $fechaEmision = $arrayDias[date('w')].", ".date('d')." de ".$arrayMeses[date('m')-1]." de ".date('Y');
    	return $this->render('PoyectoProyectoBundle:Default:facturasVentas.html.twig', array('fechaEmision' => $fechaEmision));
    }

     public function cotizacionesAction()
    {
       $arrayMeses = array('Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
       'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre');
       $arrayDias = array( 'Domingo', 'Lunes', 'Martes',
       'Miercoles', 'Jueves', 'Viernes', 'Sabado');     
       $fechaEmision = $arrayDias[date('w')].", ".date('d')." de ".$arrayMeses[date('m')-1]." de ".date('Y');
       return $this->render('PoyectoProyectoBundle:Default:cotizaciones2.html.twig', array('fechaEmision' => $fechaEmision));
    }

     public function stockIngresarAction()
    {
      return $this->render('PoyectoProyectoBundle:Default:stockIngresar.html.twig');
    }

     public function stockVerAction()
    {
      return $this->render('PoyectoProyectoBundle:Default:stockVer.html.twig');
    }

     public function pruebapdfAction()
    {
      return $this->render('PoyectoProyectoBundle:prueba:pruebapdf.html.twig');
    }

     public function pruebaAction()
    {
      return $this->render('PoyectoProyectoBundle:Default:pruebatabla.html.twig');
    }

     public function loginAction(Request $request)
    {

           $username                                  = $request->request->get('username');
           $password                                  = $request->request->get('password');
           $session                                   = $request->getSession();
           // echo'<pre>';var_dump($session);exit;
           // cuando es null colocar..ir a mysql mas rato....chao a dormir.
           if ( "CristianCelis"                       == $username &&  "lkjhgfds1" == $password ) {
           // echo'<pre>';var_dump("entro biensssss");exit;
           $session->set('user', $username);
           $session->set('id', $password);
           }
           
           return $this->render('PoyectoProyectoBundle:Default:index.html.twig');

    }  

    public function cerrarAction(Request $request)
    {

    $session = $request->getSession();
    $session->set('user', null );
    $session->set('id', null );
    // echo'<pre>';var_dump("aún no cierra");exit;
    // return header("Location: http://www.bardo1.com");
     return $this->render('PoyectoProyectoBundle:Default:index.html.twig');
    }  

     public function reportesAction()
    {
      $repository            = $this->getDoctrine()->getRepository("PoyectoProyectoBundle:DetalleProducto1");
      $listaDetalleProductos = $repository->obtenerListaReporte();

      $fechaMin              = date('Y-m-d', strtotime('-1 month'));
      $fechaMax              = date('Y-m-d');

      return $this->render('PoyectoProyectoBundle:Default:reportes.html.twig', array(
                'fechaMin'              => $fechaMin,
                'fechaMax'              => $fechaMax,
                'listaDetalleProductos' => $listaDetalleProductos
                ));
    }


     public function despliegaCantidadAction(Request $request)
    {
        $idPro      = $request->request->get('valor');
        $repository = $this->getDoctrine()->getRepository("PoyectoProyectoBundle:Producto");
        $Producto   = $repository->findOneById($idPro);
        //echo'<pre>';var_dump($Producto);exit;
        $respuesta  = array(
        'cantidad'  => $Producto->getCantidad(),
        'precio'    => $Producto->getPrecio()
        );
        return new Response(json_encode($respuesta));     
    }
    
     public function ingresaStockAction(Request $request)
    {
        $idPro      = $request->request->get('id');
        $cantidad   = $request->request->get('cantidad');
        $precio     = $request->request->get('precio');     
        $em         = $this->getDoctrine()->getManager(); 
        $repository = $this->getDoctrine()->getRepository("PoyectoProyectoBundle:Producto");
        $Producto   = $repository->findOneById($idPro);
        $resultado  ="false";

        if(!is_null($Producto)){
        $PrecioPro   = $Producto->getPrecio();
        $CantidadPro = $Producto->getCantidad();
        $Producto->setPrecio($PrecioPro+$precio);
        $Producto->setCantidad($CantidadPro+$cantidad);                  
        $em->persist($Producto);
        $em->flush();
        $resultado   ="true";
        }
        // echo'<pre>';var_dump($resultado);exit;
        return new Response(json_encode($resultado)); 
    }

      public function haciendoPruebaAction()
    {
      $datosCoti = array(
            'fechaEmision' => "",
            'senior1'      => "",
            'senior2'      => "",
        );   
      return $this->render('PoyectoProyectoBundle:Default:cotizaciones3.html.twig', array('datosCoti' => $datosCoti));
    }

    public function imprimirAction(Request $request)
    {
            $seniores1      = $request->request->get('seniores11');
            $seniores2      = $request->request->get('seniores22');     
            $arregloDetalle = $request->request->get('prueba11');
            $arregloTotales = $request->request->get('prueba22');
             
            $elArrayDetalle = explode(",", $arregloDetalle);
            $elArrayTotales = explode(",", $arregloTotales);
            $total          = $elArrayTotales[0];
            $iva            = $elArrayTotales[1];
            $totaliva       = $elArrayTotales[2];
            $valorLargo     = sizeof($elArrayDetalle);

            $cont=0;
            $i=0;
            $arrayfinaldetalle;
            while ($i < $valorLargo ) {
            echo $i;
            $DetalleProducto = new DetalleProducto1();            
            //echo'<pre>';var_dump($elArrayDetalle[$i]);exit;
            //$DetalleProducto->setId($cont);
            $DetalleProducto->setCantidad($elArrayDetalle[$i++]); 
            $DetalleProducto->setDetalle ($elArrayDetalle[$i++]); 
            $DetalleProducto->setValorunitario($elArrayDetalle[$i++]); 
            $DetalleProducto->setValortotal($elArrayDetalle[$i++]); 
            $arrayfinaldetalle[$cont++]= $DetalleProducto;
            }

            //return $this->render('PoyectoProyectoBundle:Default:pruebatabla.html.twig', array('arrayfinaldetalle' => $arrayfinaldetalle ));
            $arrayMeses   = array('Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
            'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre');
            $arrayDias    = array( 'Domingo', 'Lunes', 'Martes',
            'Miercoles', 'Jueves', 'Viernes', 'Sabado');     
            $fechaEmision = $arrayDias[date('w')].", ".date('d')." de ".$arrayMeses[date('m')-1]." de ".date('Y');
            // echo'<pre>';var_dump($arrayfinaldetalle);exit;
            $datosCoti       = array(
            'fechaEmision'      => $fechaEmision,
            'senior1'           => $seniores1,
            'senior2'           => $seniores2,
            'arrayfinaldetalle' => $arrayfinaldetalle,
            'total'             => $total,
            'iva'               => $iva,
            'totaliva'          => $totaliva,
            );

            $html = $this->renderView('PoyectoProyectoBundle:Default:cotizaciones3.html.twig', array('datosCoti' => $datosCoti));

       return new Response( $this->get('knp_snappy.pdf')->getOutputFromHtml( $html, [
            'orientation'       => 'Portrait',
            'encoding'          => 'utf-8',
            'enable-javascript' => true,
            'javascript-delay'  => 1000,
            'dpi'               => 300,
            'image-dpi'         => 300,
            'footer-spacing'    => 300,
            'header-spacing'    => 300,
            'page-width'        => 1280,
            'margin-top'        => 5,
            'margin-left'       => 1,
            'margin-right'      => 1,
            ]), 200, [ 'Content-Type' => 'application/pdf']);
    }

      public function ingresarnotaventaAction(Request $request)
    {

     $repository = $this->getDoctrine()->getRepository("PoyectoProyectoBundle:NotaVenta1");
       $docu =   $repository->createQueryBuilder('p')
            ->select('p, MAX(p.id) AS max_score')
            ->getQuery();

     $document        = $docu ->getResult();
     $ultimaNotaVenta = $document[0]["max_score"]+1; 
     $em              = $this->getDoctrine()->getManager();   
     $notaVenta       = new NotaVenta1();
     $fecha           = $request->request->get('fechamax');

     //echo'<pre>';var_dump($fecha);exit; 
     //echo'<pre>';var_dump(\DateTime::createFromFormat('d/m/Y', $fecha ));exit;
     $cliente         = $request->request->get('cliente');
     $direccion       = $request->request->get('direccion');
     $comuna          = $request->request->get('comuna');
     $fono            = $request->request->get('fono');
     $vendedor        = $request->request->get('vendedor');
     $horainicio      = $request->request->get('horainicio');
     $horatermino     = $request->request->get('horatermino');
     $totalhoras      = $request->request->get('totalhoras');
     $arregloDetalle  = $request->request->get('arregloDetalle');
     $valorLargo      = sizeof($arregloDetalle);
     $valorCiclo      = ($valorLargo/4);

     $i=0;
      while ($i < $valorLargo ) {
         $DetalleProducto = new DetalleProducto1();

         // Acá restar el producto a la base de datos
         // Se busca a traves del nombre id ....Se obtiene el objeto y si este ak restarlo con el nuevo valor  de cantidad ni da un numero
         // Menor a cero, este debe ser ingresado , de lo contrario , se debe mostrar un mensaje de que el producto es mejor al stock.

         $Cantidad       = $arregloDetalle[$i++];
         $Detalle        = $arregloDetalle[$i++];
         $ValorUnitario  = $arregloDetalle[$i++];
         $ValorTotal     = $arregloDetalle[$i++];

         $repository     = $this->getDoctrine()->getRepository("PoyectoProyectoBundle:Producto");
         $Producto       = $repository->findOneByNombre($Detalle);
         $DetalleProducto->setCantidad($Cantidad); 
         $DetalleProducto->setDetalle ($Detalle); 
         $CantidadEnBase = $Producto->getCantidad();
        if(($CantidadEnBase - $Cantidad)<0)
        {
          $valor = $CantidadEnBase - $Cantidad;
          $arr   = array('Detalle' => $Detalle, 'Valor' => $valor);
          //echo'<pre>';var_dump("prueba");exit; 
          //Devolvemos el nombre del producto que excede la cantidad a restar 
          return new Response(json_encode($arr));
        }

        $DetalleProducto->setValorunitario($ValorUnitario); 
        $DetalleProducto->setValortotal($ValorTotal); 
        $DetalleProducto->setIdnotaventa($ultimaNotaVenta);
        $em->persist($DetalleProducto);
     }

     $em->flush();
     //sustituir esta fecha por la correcta en el momento de la validación.
     //$fechaMax   = new \DateTime($request->request->get('fechaMax'));
     //new \DateTime('Y-m-d');
    // echo'<pre>';var_dump($fecha);exit; 
     $notaVenta->setFecha(\DateTime::createFromFormat('d/m/Y', $fecha)); 
     $notaVenta->setCliente($cliente);
     $notaVenta->setDireccion($direccion);
     $notaVenta->setComuna($comuna);
     $notaVenta->setFono($fono);
     $notaVenta->setVendedor($vendedor); 
     $notaVenta->setHoraini($horainicio); 
     $notaVenta->setHorater($horatermino); 
     $notaVenta->setTotalhoras($totalhoras); 
     $em->persist($notaVenta);
     $em->flush();
     
     return new Response(json_encode(true));
     //return $this->render('PoyectoProyectoBundle:Default:index.html.twig');
    }

     public function ventasAction()
    {   
       //fecha de hoy 
       $arrayMeses   = array('Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
       'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre');
       $arrayDias    = array( 'Domingo', 'Lunes', 'Martes',
       'Miercoles', 'Jueves', 'Viernes', 'Sabado');     
       $fechaEmision = $arrayDias[date('w')].", ".date('d')." de ".$arrayMeses[date('m')-1]." de ".date('Y');
       // numero de nota de venta
       $repository = $this->getDoctrine()->getRepository("PoyectoProyectoBundle:NotaVenta1");
       $docu       = $repository->createQueryBuilder('p')
            ->select('p, MAX(p.id) AS max_score')
            ->getQuery();

       $document        = $docu ->getResult();
       $numeroNotaVenta = $document[0]["max_score"]+1; 
       // fecha para el input
       $fechaMax        = date('Y-m-d');
       return $this->render('PoyectoProyectoBundle:Default:ventas.html.twig', array('fechaEmision' => $fechaEmision, 'numeroNotaVenta' => $numeroNotaVenta,'fechaMax' => $fechaMax ));
    }

     public function entradadespleAction($id)
    {
        // echo'<pre>';var_dump("pooooooor acá se fue el mambo ");exit;
        $repository        = $this->getDoctrine()->getRepository("PoyectoProyectoBundle:NotaVenta1");
        $NotaVenta         = $repository->findOneById($id);
        //  echo'<pre>';var_dump($NotaVenta);exit;
        $repository        = $this->getDoctrine()->getRepository("PoyectoProyectoBundle:DetalleProducto1");
        $DetalleProducto1s = $repository->findByIdnotaventa($id);
        // echo'<pre>';var_dump($DetalleProducto1s);exit;
        $valorLargo        = sizeof($DetalleProducto1s);

        $i=0;
        $suma=0;
        while($i<$valorLargo){
        $suma=$suma+$DetalleProducto1s[$i]->getValortotal();
        $i++;
        }

        $total=$suma;
        $iva=($suma*0.19);
        $totaliva=$total+$iva;

        //echo'<pre>';var_dump($DetalleProducto1s);exit;
        //generar nueva vista para el despliegue de la nota de venta.
        //valores de nota venta
        //valores de detalle de nota venta
        //valores de totales a mostrar.....Con un recorrido de los datos dedetalle de nota de venta
       
        return $this->render('PoyectoProyectoBundle:Default:despliegueNota.html.twig', array("notaVenta"=> $NotaVenta, "DetalleProducto" => $DetalleProducto1s, "total"=> $total, "iva"=> $iva, "totaliva"=> $totaliva ));

    }
    
    
}
