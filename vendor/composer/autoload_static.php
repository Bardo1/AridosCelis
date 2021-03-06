<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInitf9a351da6a15f8eccfc85e361cc4a9a5
{
    public static $files = array (
        'ce89ac35a6c330c55f4710717db9ff78' => __DIR__ . '/..' . '/kriswallsmith/assetic/src/functions.php',
        '2c102faa651ef8ea5874edb585946bce' => __DIR__ . '/..' . '/swiftmailer/swiftmailer/lib/swift_required.php',
        '3fad0ebbff9928a94a9d8941fb314bd8' => __DIR__ . '/..' . '/symfony/symfony/src/Symfony/Component/Intl/Resources/stubs/functions.php',
    );

    public static $prefixLengthsPsr4 = array (
        'K' => 
        array (
            'Knp\\Bundle\\SnappyBundle\\' => 24,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'Knp\\Bundle\\SnappyBundle\\' => 
        array (
            0 => __DIR__ . '/..' . '/knplabs/knp-snappy-bundle',
        ),
    );

    public static $prefixesPsr0 = array (
        'T' => 
        array (
            'Twig_Extensions_' => 
            array (
                0 => __DIR__ . '/..' . '/twig/extensions/lib',
            ),
            'Twig_' => 
            array (
                0 => __DIR__ . '/..' . '/twig/twig/lib',
            ),
        ),
        'S' => 
        array (
            'Symfony\\Component\\Icu\\' => 
            array (
                0 => __DIR__ . '/..' . '/symfony/icu',
            ),
            'Symfony\\Bundle\\SwiftmailerBundle' => 
            array (
                0 => __DIR__ . '/..' . '/symfony/swiftmailer-bundle',
            ),
            'Symfony\\Bundle\\MonologBundle' => 
            array (
                0 => __DIR__ . '/..' . '/symfony/monolog-bundle',
            ),
            'Symfony\\Bundle\\AsseticBundle' => 
            array (
                0 => __DIR__ . '/..' . '/symfony/assetic-bundle',
            ),
            'Symfony\\' => 
            array (
                0 => __DIR__ . '/..' . '/symfony/symfony/src',
            ),
            'Sensio\\Bundle\\GeneratorBundle' => 
            array (
                0 => __DIR__ . '/..' . '/sensio/generator-bundle',
            ),
            'Sensio\\Bundle\\FrameworkExtraBundle' => 
            array (
                0 => __DIR__ . '/..' . '/sensio/framework-extra-bundle',
            ),
            'Sensio\\Bundle\\DistributionBundle' => 
            array (
                0 => __DIR__ . '/..' . '/sensio/distribution-bundle',
            ),
        ),
        'P' => 
        array (
            'Psr\\Log\\' => 
            array (
                0 => __DIR__ . '/..' . '/psr/log',
            ),
        ),
        'M' => 
        array (
            'Monolog' => 
            array (
                0 => __DIR__ . '/..' . '/monolog/monolog/src',
            ),
        ),
        'K' => 
        array (
            'Knp\\Snappy' => 
            array (
                0 => __DIR__ . '/..' . '/knplabs/knp-snappy/src',
            ),
        ),
        'I' => 
        array (
            'Incenteev\\ParameterHandler' => 
            array (
                0 => __DIR__ . '/..' . '/incenteev/composer-parameter-handler',
            ),
        ),
        'D' => 
        array (
            'Doctrine\\ORM' => 
            array (
                0 => __DIR__ . '/..' . '/doctrine/orm/lib',
            ),
            'Doctrine\\DBAL' => 
            array (
                0 => __DIR__ . '/..' . '/doctrine/dbal/lib',
            ),
            'Doctrine\\Common' => 
            array (
                0 => __DIR__ . '/..' . '/doctrine/common/lib',
            ),
            'Doctrine\\Bundle\\DoctrineBundle' => 
            array (
                0 => __DIR__ . '/..' . '/doctrine/doctrine-bundle',
            ),
        ),
        'A' => 
        array (
            'Assetic' => 
            array (
                0 => __DIR__ . '/..' . '/kriswallsmith/assetic/src',
            ),
        ),
    );

    public static $fallbackDirsPsr0 = array (
        0 => __DIR__ . '/../..' . '/src',
    );

    public static $classMap = array (
        'Collator' => __DIR__ . '/..' . '/symfony/symfony/src/Symfony/Component/Intl/Resources/stubs/Collator.php',
        'IntlDateFormatter' => __DIR__ . '/..' . '/symfony/symfony/src/Symfony/Component/Intl/Resources/stubs/IntlDateFormatter.php',
        'Locale' => __DIR__ . '/..' . '/symfony/symfony/src/Symfony/Component/Intl/Resources/stubs/Locale.php',
        'NumberFormatter' => __DIR__ . '/..' . '/symfony/symfony/src/Symfony/Component/Intl/Resources/stubs/NumberFormatter.php',
        'SessionHandlerInterface' => __DIR__ . '/..' . '/symfony/symfony/src/Symfony/Component/HttpFoundation/Resources/stubs/SessionHandlerInterface.php',
        'SqlFormatter' => __DIR__ . '/..' . '/jdorn/sql-formatter/lib/SqlFormatter.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInitf9a351da6a15f8eccfc85e361cc4a9a5::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInitf9a351da6a15f8eccfc85e361cc4a9a5::$prefixDirsPsr4;
            $loader->prefixesPsr0 = ComposerStaticInitf9a351da6a15f8eccfc85e361cc4a9a5::$prefixesPsr0;
            $loader->fallbackDirsPsr0 = ComposerStaticInitf9a351da6a15f8eccfc85e361cc4a9a5::$fallbackDirsPsr0;
            $loader->classMap = ComposerStaticInitf9a351da6a15f8eccfc85e361cc4a9a5::$classMap;

        }, null, ClassLoader::class);
    }
}
