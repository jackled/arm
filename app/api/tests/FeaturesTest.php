<?php

namespace Api\Model;

use \Slim\Environment;
use \Api\Application;

class FeaturesTest extends \PHPUnit_Framework_TestCase {

    public function testIndex() {
        // setup
        Environment::mock(array(
            'PATH_INFO' => '/allfeatures',
        ));
        $app = new Application();
        $app->config('debug', false);
        $expected = array();
        foreach ($app->config['features'] as $id => $feature) {
            $expected[] = array(
                'id' => $id,
                'name' => $feature['name'],
                'href' => './api/features/' . $id
            );
        }

        // invoke call
        $response = $app->invoke();

        // test assertion
        $this->assertEquals(200, $response->getStatus());
        $this->assertEquals(json_encode($expected), $response->getBody());
    }

    public function testGet() {
        $id = 'get';
        Environment::mock(array(
            'PATH_INFO' => '/features/' . $id
        ));
        $app = new Application();
        $app->config('debug', false);

        $response = $app->invoke();

        $this->assertEquals(200, $response->getStatus());
        $this->assertEquals(
            json_encode(array_merge(array('id' => $id), $app->config['features'][$id], array('href' => './api/features/' . $id))), $response->getBody()
        );
    }

    public function testPut() {
        $id = 'put';
        Environment::mock(array(
            'PATH_INFO' => '/features/' . $id
        ));
        $app = new Application();
        $app->config('debug', false);

        $response = $app->invoke();

        $this->assertEquals(200, $response->getStatus());
        $this->assertEquals(
            json_encode(array_merge(array('id' => $id), $app->config['features'][$id], array('href' => './api/features/' . $id))), $response->getBody()
        );
    }

    public function testPost() {
        $id = 'post';
        Environment::mock(array(
            'PATH_INFO' => '/features/' . $id
        ));
        $app = new Application();
        $app->config('debug', false);

        $response = $app->invoke();

        $this->assertEquals(200, $response->getStatus());
        $this->assertEquals(
            json_encode(array_merge(array('id' => $id), $app->config['features'][$id], array('href' => './api/features/' . $id))), $response->getBody()
        );
    }

    public function testDelete() {
        $id = 'delete';
        Environment::mock(array(
            'PATH_INFO' => '/features/' . $id
        ));
        $app = new Application();
        $app->config('debug', false);

        $response = $app->invoke();

        $this->assertEquals(200, $response->getStatus());
        $this->assertEquals(
            json_encode(array_merge(array('id' => $id), $app->config['features'][$id], array('href' => './api/features/' . $id))), $response->getBody()
        );
    }

    public function testUnknownFeatureGets404() {
        Environment::mock(array(
            'PATH_INFO' => '/features/unknown',
        ));

        $app = new Application();
        $app->config('debug', false);

        $response = $app->invoke();

        $this->assertEquals(json_encode(array(
            "status" => 404,
            "statusText" => "Not Found",
            "description" => "Resource /features/unknown using GET method does not exist.",
            )), $response->getBody());

        $this->assertEquals(404, $response->getStatus());
    }

    public function testGetFeaturesReturnsExpectedFeatures() {
        $allFeatures = array(
            'f1' => array('name' => 'feature 1', 'description' => 'description 1'),
            'f2' => array('name' => 'feature 2', 'description' => 'description 2'),
        );
        $features = new Features($allFeatures);
        $this->assertEquals(array(
            array('id' => 'f1', 'name' => 'feature 1', 'href' => './api/features/f1'),
            ), $features->getFeatures('f1'));
    }

    public function testGetFeatureReturnsExpectedFeature() {
        $allFeatures = array(
            'f1' => array('name' => 'feature 1', 'description' => 'description 1'),
            'f2' => array('name' => 'feature 2', 'description' => 'description 2'),
        );
        $features = new Features($allFeatures);
        $this->assertEquals(
            array(
            'id' => 'f1',
            'name' => 'feature 1',
            'description' => 'description 1',
            'href' => './api/features/f1',
            ), $features->getFeature('f1')
        );
        $this->assertEquals(
            array(
            'id' => 'f2',
            'name' => 'feature 2',
            'description' => 'description 2',
            'href' => './api/features/f2',
            ), $features->getFeature('f2')
        );
    }

    public function testGetUnknownFeatureReturnsNull() {
        $allFeatures = array(
            'f1' => array('name' => 'feature 1', 'description' => 'description 1'),
            'f2' => array('name' => 'feature 2', 'description' => 'description 2'),
        );
        $features = new Features($allFeatures);
        $this->assertEquals(null, $features->getFeature('f3'));
    }

}
