<?php

namespace Api;

use \Slim\Environment;
use \Api\Application;
use \Exception;

class ApplicationTest extends \PHPUnit_Framework_TestCase {

    /**
     * @expectedException Exception
     */
    public function testMissingConfigurationDirectoryGeneratesException() {
        new Application(array(), 'missingConfigDirectory');
    }

    public function testHttpExceptionGenerates500() {
        Environment::mock(array(
            'PATH_INFO' => '/api/test/http-exception',
        ));

        $app = new Application();
        $app->config('debug', false);

        $app->get('/api/test/http-exception', function () {
            throw new Exception('HTTP exception', 406);
        });

        $response = $app->invoke();
        $this->assertEquals(json_encode(array(
            'status' => 406,
            'statusText' => 'Not Acceptable',
            'description' => 'HTTP exception',
            )), $response->getBody());
        $this->assertEquals(406, $response->getStatus());
    }

    public function testUndefinedExceptionGenerates500() {
        Environment::mock(array(
            'PATH_INFO' => '/api/test/undefined-exception',
        ));

        $app = new Application();
        $app->config('debug', false);
        $app->get('/api/test/undefined-exception', function () {
            throw new Exception('Undefined exception');
        });

        $response = $app->invoke();
        $this->assertEquals(json_encode(array(
            'status' => 500,
            'statusText' => 'Internal Server Error',
            'description' => 'Undefined exception',
            )), $response->getBody());
        $this->assertEquals(500, $response->getStatus());
    }

    public function testUnkownHttpStatusExceptionGenerates500() {
        Environment::mock(array(
            'PATH_INFO' => '/api/test/undefined-exception',
        ));

        $app = new Application();
        $app->config('debug', false);
        $app->get('/api/test/undefined-exception', function () {
            throw new Exception('Exception with unknown HTTP status', 999);
        });

        $response = $app->invoke();
        $this->assertEquals(json_encode(array(
            'status' => 500,
            'statusText' => 'Internal Server Error',
            'description' => 'Exception with unknown HTTP status',
            )), $response->getBody());
        $this->assertEquals(500, $response->getStatus());
    }

}
