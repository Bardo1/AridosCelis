<?php

namespace Poyecto\ProyectoBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * DetalleProducto
 */
class DetalleProducto
{
    /**
     * @var integer
     */
    private $id;

    /**
     * @var string
     */
    private $cantidad;

    /**
     * @var string
     */
    private $detalle;

    /**
     * @var string
     */
    private $valorunitario;

    /**
     * @var string
     */
    private $valortotal;

    /**
     * @var int;
     */
             
    private $idNotaVenta;

    /**
     * Get id
     *
     * @return integer 
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set idNotaVenta
     *
     * @param \Poyecto\ProyectoBundle\Entity\notaVenta $idNotaVenta
     * @return notaVenta
     */
    public function setIdNotaVenta(\Poyecto\ProyectoBundle\Entity\notaVenta $idNotaVenta = null)
    {
        $this->idNotaVenta = $idNotaVenta;

        return $this;
    }

    /**
     * Set cantidad
     *
     * @param string $cantidad
     * @return DetalleProducto
     */
    public function setCantidad($cantidad)
    {
        $this->cantidad = $cantidad;
    
        return $this;
    }

    /**
     * Get cantidad
     *
     * @return string 
     */
    public function getCantidad()
    {
        return $this->cantidad;
    }

    /**
     * Set detalle
     *
     * @param string $detalle
     * @return DetalleProducto
     */
    public function setDetalle($detalle)
    {
        $this->detalle = $detalle;
    
        return $this;
    }

    /**
     * Get detalle
     *
     * @return string 
     */
    public function getDetalle()
    {
        return $this->detalle;
    }

    /**
     * Set valorunitario
     *
     * @param string $valorunitario
     * @return DetalleProducto
     */
    public function setValorunitario($valorunitario)
    {
        $this->valorunitario = $valorunitario;
    
        return $this;
    }

    /**
     * Get valorunitario
     *
     * @return string 
     */
    public function getValorunitario()
    {
        return $this->valorunitario;
    }

    /**
     * Set valortotal
     *
     * @param string $valortotal
     * @return DetalleProducto
     */
    public function setValortotal($valortotal)
    {
        $this->valortotal = $valortotal;
    
        return $this;
    }

    /**
     * Get valortotal
     *
     * @return string 
     */
    public function getValortotal()
    {
        return $this->valortotal;
    }
}