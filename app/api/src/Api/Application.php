<?php

namespace Api;

use Api\Model\Features;
use \Slim\Slim;
use \Exception;
use \JSend\JSendResponse;
use \USF\IdM\UsfConfig;
use \USF\auth\SlimAuthMiddleware;
use \USF\IdM\SlimLogMiddleware;
use \USF\IdM\UsfARMapi;
use \USF\IdM\UsfVipDatabase;

// TODO Move all "features" things to a class with index() and get() methods
class Application extends Slim {

    public $configDirectory;
    public $config;

    public function __construct(array $userSettings = array(), $configDirectory = 'config') {
        // Slim initialization
        parent::__construct($userSettings);

        $this->notFound(function () {
            $this->handleNotFound();
        });
        $this->error(function ($e) {
            $this->handleException($e);
        });

        // Load config files
        $this->configDirectory = __DIR__ . '/../../' . $configDirectory;
        $this->config = new UsfConfig($this->configDirectory);

        // Security
        $this->environment['auth.config.cas'] = $this->config->casConfig;
        $this->environment['auth.config.token'] = $this->config->tokenConfig;
        $this->environment['auth.interceptUrlMap'] = $this->config->urlMapConfig;

        // Logging
        $this->environment['log.config'] = $this->config->logConfig;

        // Add the Middleware
        $this->add(new SlimAuthMiddleware());
        $this->add(new SlimLogMiddleware());

        // identity
        $this->put('/identity', function () {
            $name = $this->environment['principal.attributes']['GivenName'] . ' ' . $this->environment['principal.attributes']['Surname'];
            if (in_array($this->config->entitlement, $this->environment['principal.entitlements'])) {
                $role = 'Admin';
            } else {
                $role = 'User';
            }
            $this->log->info('Identity: ' . $name . ' - ' . $role);
            $this->response->headers->set('Content-Type', 'application/json');
            $this->response->setBody(json_encode(array('name' => $name, 'role' => $role)));
        });

        // /features
        $this->get('/allfeatures', function () { // get all features with id=get
            $features = new Features($this->config['features']);
            $this->response->headers->set('Content-Type', 'application/json');
            $this->response->setBody(json_encode($features->getFeatures('')));
        });

        $this->get('/features', function () { // get all features with id=get
            $features = new Features($this->config['features']);
            $this->response->headers->set('Content-Type', 'application/json');
            $this->response->setBody(json_encode($features->getFeatures('get')));
        });

        $this->get('/features/:id', function ($id) {
            $features = new Features($this->config['features']);
            $feature = $features->getFeature($id);
            if ($feature === null) {
                return $this->notFound();
            }
            $this->response->headers->set('Content-Type', 'application/json');
            $this->response->setBody(json_encode($feature));
        });

        $this->put('/features', function () { // get all features with id=put
            $features = new Features($this->config['features']);
            $this->response->headers->set('Content-Type', 'application/json');
            $this->response->setBody(json_encode($features->getFeatures('put')));
        });

        $this->put('/features/:id', function ($id) {
            $features = new Features($this->config['features']);
            $feature = $features->getFeature($id);
            if ($feature === null) {
                return $this->notFound();
            }
            $this->response->headers->set('Content-Type', 'application/json');
            $this->response->setBody(json_encode($feature));
        });

        $this->post('/features', function () { // get all features with id=post
            $features = new Features($this->config['features']);
            $this->response->headers->set('Content-Type', 'application/json');
            $this->response->setBody(json_encode($features->getFeatures('post')));
        });

        $this->post('/features/:id', function ($id) {
            $features = new Features($this->config['features']);
            $feature = $features->getFeature($id);
            if ($feature === null) {
                return $this->notFound();
            }
            $this->response->headers->set('Content-Type', 'application/json');
            $this->response->setBody(json_encode($feature));
        });

        // used to demo the db access
        $this->delete('/features', function () { // get alll features with id=delete
            $features = new Features($this->config['features']);
            // piggyback on features data
            $payload = $features->getFeatures('delete');
            $payload[0]['count'] = $features->getVipCount();
            $this->response->headers->set('Content-Type', 'application/json');
            $this->response->setBody(json_encode($payload));
        });

        $this->delete('/features/:id', function ($id) {
            $features = new Features($this->config['features']);
            $feature = $features->getFeature($id);
            if ($feature === null) {
                return $this->notFound();
            }
            $this->response->headers->set('Content-Type', 'application/json');
            $this->response->setBody(json_encode($feature));
        });
        
        // UsfARMapi methods
        /**
         * Retrieves an array of accounts for a specified identity object
         */
        $this->get('/accounts/identity/:identity', function ($identity) {
            $usfARMapi = new UsfARMapi();
            $accounts = $usfARMapi.getAccountsForIdentity($identity);
            $success = new JSendResponse('success', [ "accounts" => $accounts ]);
            $this->response->headers->set('X-Api-Version', $usfARMapi.getVersion());
            $this->response->headers->set('Content-Type', 'application/json');
            $this->response->setBody($success->encode());
        });
        /**
         * Retrieves an array of roles for a specified account object
         */
        $this->get('/roles/account/:account', function ($account) {
            $usfARMapi = new UsfARMapi();
            $rolls = $usfARMapi.getRolesForAccount($account);
            $success = new JSendResponse('success', [ "rolls" => $rolls ]);
            $this->response->headers->set('X-Api-Version', $usfARMapi.getVersion());
            $this->response->headers->set('Content-Type', 'application/json');
            $this->response->setBody($success->encode());
        });
        /**
         * Retrieves an array of roles for a specified identity object
         */
        $this->get('/roles/identity/:identity', function ($identity) {
            $usfARMapi = new UsfARMapi();
            $rolls = $usfARMapi.getRolesForIdentity($identity);
            $success = new JSendResponse('success', [ "rolls" => $rolls ]);
            $this->response->headers->set('X-Api-Version', $usfARMapi.getVersion());
            $this->response->headers->set('Content-Type', 'application/json');
            $this->response->setBody($success->encode());
        });
        /**
         * Retrieves an identity associated with a specified account object
         */
        $this->get('/identities/account/:account', function ($account) {
            $usfARMapi = new UsfARMapi();
            $identity = $usfARMapi.getIdentityForAccount($account);
            $success = new JSendResponse('success', [ "identity" => $identity ]);
            $this->response->headers->set('X-Api-Version', $usfARMapi.getVersion());
            $this->response->headers->set('Content-Type', 'application/json');
            $this->response->setBody($success->encode());
        });
        /**
         * Retrieves an array of identities associated with a specified role object
         */
        $this->get('/identities/role/:role', function ($role) {
            $usfARMapi = new UsfARMapi();
            $identities = $usfARMapi.getIdentitiesForRole($role);
            $success = new JSendResponse('success', [ "identities" => $identities ]);
            $this->response->headers->set('X-Api-Version', $usfARMapi.getVersion());
            $this->response->headers->set('Content-Type', 'application/json');
            $this->response->setBody($success->encode());
        });
        /**
         * Assigns a specified account object with an existing identity
         */
        $this->post('/accounts/identity/:identity', function ($identity) {
            $usfARMapi = new UsfARMapi();
            $account = $this->request()->post('account');
            $status = $usfARMapi.setAccountForIdentity($identity,$account);
            $success = new JSendResponse('success', [ "status" => $status ]);
            $this->response->headers->set('X-Api-Version', $usfARMapi.getVersion());
            $this->response->headers->set('Content-Type', 'application/json');
            $this->response->setBody($success->encode());
        });
        /**
         * Assigns a specified role object with an existing account
         */
        $this->post('/rolls/account/:account', function ($account) {
            $usfARMapi = new UsfARMapi();
            $role = $this->request()->post('roll');
            $status = $usfARMapi.setRoleForAccount($account,$role);
            $success = new JSendResponse('success', [ "status" => $status ]);
            $this->response->headers->set('X-Api-Version', $usfARMapi.getVersion());
            $this->response->headers->set('Content-Type', 'application/json');
            $this->response->setBody($success->encode());
        });
        
    }

    public function handleNotFound() {
        throw new Exception(
        'Resource ' . $this->request->getResourceUri() . ' using '
        . $this->request->getMethod() . ' method does not exist.', 404
        );
    }

    public function handleException(Exception $e) {
        $status = $e->getCode();
        $statusText = \Slim\Http\Response::getMessageForCode($status);
        if ($statusText === null) {
            $status = 500;
            $statusText = 'Internal Server Error';
        }

        $this->response->setStatus($status);
        $this->response->headers->set('Content-Type', 'application/json');
        $this->response->setBody(json_encode(array(
            'status' => $status,
            'statusText' => preg_replace('/^[0-9]+ (.*)$/', '$1', $statusText),
            'description' => $e->getMessage(),
        )));
    }

    /**
     * @return \Slim\Http\Response
     */
    public function invoke() {
        foreach ($this->middleware as $middleware) {
            $middleware->call();
        }
        $this->response()->finalize();
        return $this->response();
    }

}
