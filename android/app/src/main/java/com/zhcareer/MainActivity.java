package com.zhcareer;

import com.facebook.react.ReactActivity;
import android.os.Build;
import android.os.Bundle;
import android.view.WindowManager;

public class MainActivity extends ReactActivity {

    //onCreate
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        //Exit.activity = this;

        //沉浸式状态栏
        initState();
    }

    //沉浸式状态栏
    private void initState() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
            //透明状态栏
            getWindow().addFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS);
            //透明导航栏
            //getWindow().addFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_NAVIGATION);
        }
    }

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "ZhCareer";
    }
}
