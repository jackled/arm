<?php

namespace Api\Model;

use \USF\IdM\UsfVipDatabase;

class Features {

    protected $features;

    protected function getHref($id) {
        return './api/features/' . $id;
    }

    public function __construct($features) {
        $this->features = $features;
    }

    public function getFeatures($label) {
        $features = array();
        foreach ($this->features as $id => $feature) {
            if ($label == '' OR $label == $id) {
                $features[] = array(
                    'id' => $id,
                    'name' => $feature['name'],
                    'href' => $this->getHref($id),
                );
            }
        }
        return $features;
    }

    public function getFeature($id) {
        if (!array_key_exists($id, $this->features)) {
            return null;
        }
        return array_merge(
            array('id' => $id), $this->features[$id], array('href' => $this->getHref($id))
        );
    }

    // get number of rows from vip.identity table and append it to name
    public function getVipCount() {
        $db = new UsfVipDatabase();
        return $db->identityCount();
    }

}
