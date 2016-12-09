<?php

namespace Poyecto\ProyectoBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * DetalleProducto
 *
 * @ORM\Table()
 * @ORM\Entity(repositoryClass="Poyecto\ProyectoBundle\Entity\DetalleProductoRepository")
 */
class DetalleProducto
{
    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="cantidad", type="string", length=255)
     */
    private $cantidad;

    /**
     * @var string
     *
     * @ORM\Column(name="detalle", type="string", length=255)
     */
    private $detalle;

    /**
     * @var string
     *
     * @ORM\Column(name="valorunitario", type="string", length=255)
     */
    private $valorunitario;

    /**
     * @var string
     *
     * @ORM\Column(name="valortotal", type="string", length=255)
     */
    private $valortotal;

    /**
     * @var \Poyecto\ProyectoBundle\Entity\notaVenta;
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
     * Get idNotaVenta
     *
     * @return \Poyecto\ProyectoBundle\Entity\notaVenta
     */
    public function getIdSexo()
    {
        return  $this->idNotaVenta;
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
