<?php

namespace Poyecto\ProyectoBundle\Entity;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;

/**
 * notaVenta
 */
class notaVenta
{
    /**
     * @var integer
     */
    private $id;

    /**
     * @var \DateTime
     */
    private $fecha;

    /**
     * @var string
     */
    private $cliente;

    /**
     * @var string
     */
    private $direccion;

    /**
     * @var string
     */
    private $comuna;

    /**
     * @var string
     */
    private $fono;

    /**
     * @var string
     */
    private $vendedor;

    /**
     * @var string
     */
    private $horaini;

    /**
     * @var string
     */
    private $horater;

     /**
     * @var Collection
     * @OneToMany(targetEntity="DetalleProducto", mappedBy="notaVenta")
     */
    protected $detallesproducto;

    public function __construct() {
        $this->detallesproducto = new ArrayCollection();
    }


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
     * Set fecha
     *
     * @param \DateTime $fecha
     * @return notaVenta
     */
    public function setFecha($fecha)
    {
        $this->fecha = $fecha;
    
        return $this;
    }

    /**
     * Get fecha
     *
     * @return \DateTime 
     */
    public function getFecha()
    {
        return $this->fecha;
    }

    /**
     * Set cliente
     *
     * @param string $cliente
     * @return notaVenta
     */
    public function setCliente($cliente)
    {
        $this->cliente = $cliente;
    
        return $this;
    }

    /**
     * Get cliente
     *
     * @return string 
     */
    public function getCliente()
    {
        return $this->cliente;
    }

    /**
     * Set direccion
     *
     * @param string $direccion
     * @return notaVenta
     */
    public function setDireccion($direccion)
    {
        $this->direccion = $direccion;
    
        return $this;
    }

    /**
     * Get direccion
     *
     * @return string 
     */
    public function getDireccion()
    {
        return $this->direccion;
    }

    /**
     * Set comuna
     *
     * @param string $comuna
     * @return notaVenta
     */
    public function setComuna($comuna)
    {
        $this->comuna = $comuna;
    
        return $this;
    }

    /**
     * Get comuna
     *
     * @return string 
     */
    public function getComuna()
    {
        return $this->comuna;
    }

    /**
     * Set fono
     *
     * @param string $fono
     * @return notaVenta
     */
    public function setFono($fono)
    {
        $this->fono = $fono;
    
        return $this;
    }

    /**
     * Get fono
     *
     * @return string 
     */
    public function getFono()
    {
        return $this->fono;
    }

    /**
     * Set vendedor
     *
     * @param string $vendedor
     * @return notaVenta
     */
    public function setVendedor($vendedor)
    {
        $this->vendedor = $vendedor;
    
        return $this;
    }

    /**
     * Get vendedor
     *
     * @return string 
     */
    public function getVendedor()
    {
        return $this->vendedor;
    }

    /**
     * Set horaini
     *
     * @param string $horaini
     * @return notaVenta
     */
    public function setHoraini($horaini)
    {
        $this->horaini = $horaini;
    
        return $this;
    }

    /**
     * Get horaini
     *
     * @return string 
     */
    public function getHoraini()
    {
        return $this->horaini;
    }

    /**
     * Set horater
     *
     * @param string $horater
     * @return notaVenta
     */
    public function setHorater($horater)
    {
        $this->horater = $horater;
    
        return $this;
    }

    /**
     * Get horater
     *
     * @return string 
     */
    public function getHorater()
    {
        return $this->horater;
    }
}